import { Modules, TryCatchWrapperAsync } from '@app/models';
import {
  SynServiceClient,
  SYN_SERVICE_NAME,
  Request,
} from '@app/proto/proto/build/syn';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FileData } from '../models/file-data.model';
import fs from 'fs';
import path from 'path';
import { ReplaySubject } from 'rxjs';
import { filter, repeat, tap } from 'rxjs/operators';
import { DocService } from '../doc/doc.service';

@Injectable()
export class SynologyService implements OnModuleInit {
  synService: SynServiceClient;

  logger = new Logger(this.constructor.name);

  constructor(
    @Inject(Modules.SYN) private synClient: ClientGrpc,
    private readonly docService: DocService,
  ) {}

  onModuleInit() {
    this.synService = this.synClient.getService<SynServiceClient>(
      SYN_SERVICE_NAME,
    );
  }

  @TryCatchWrapperAsync()
  async uploadFile(file: FileData): Promise<void> {
    const req = new ReplaySubject<Request>();

    const filePath = path.resolve(process.cwd(), `./tmp/${file.id}`);

    const fileStream = fs.createReadStream(filePath);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let i = 0;

    fileStream.on('data', chunk => {
      if (i === 0) {
        req.next({ metadata: file, data: undefined });
      } else {
        req.next({ metadata: undefined, data: { chunk: chunk as Uint8Array } });
      }
      i++;
    });
    fileStream.on('error', err => {
      req.error(err);
    });
    fileStream.on('end', () => {
      req.complete();
    });

    let count = 0;

    this.synService
      .uploadFile(req.asObservable())
      .pipe(
        filter(value => value.error && count <= 5),
        tap(() => count++),
        repeat(1),
      )
      .subscribe(res => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          fs.unlink(filePath, err => {
            throw new Error(err.message);
          });
          this.docService.fileUploaded(res);
        }
      });
  }
}

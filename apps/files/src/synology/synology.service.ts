import { Modules, TryCatchWrapperAsync } from '@app/models';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FileData } from '../models/file-data.model';
import fs from 'fs';
import path from 'path';
import { ReplaySubject } from 'rxjs';
import { DocService } from '../doc/doc.service';
import {
  PythonFilesServiceClient,
  PYTHON_FILES_SERVICE_NAME,
  Request,
} from '@app/proto/proto/build/python_files';

@Injectable()
export class SynologyService implements OnModuleInit {
  pythonFileService: PythonFilesServiceClient;

  logger = new Logger(this.constructor.name);

  constructor(
    @Inject(Modules.PYTHON) private pythonFileClient: ClientGrpc,
    private readonly docService: DocService,
  ) {}

  onModuleInit() {
    this.pythonFileService = this.pythonFileClient.getService<
      PythonFilesServiceClient
    >(PYTHON_FILES_SERVICE_NAME);
  }

  @TryCatchWrapperAsync()
  async uploadFile(file: FileData): Promise<void> {
    const req = new ReplaySubject<Request>();

    const filePath = path.resolve(process.cwd(), `./tmp/${file.id}`);

    const fileStream = fs.createReadStream(filePath);

    const i = 0;

    fileStream.on('data', chunk => {
      req.next({ metadata: undefined, chunk: chunk as Uint8Array });
    });
    fileStream.on('error', err => {
      req.error(err);
    });
    fileStream.on('end', () => {
      req.next({ metadata: file, chunk: undefined });
      req.complete();
    });

    this.pythonFileService.uploadFile(req.asObservable()).subscribe(res => {
      if (res.error) {
        this.logger.log(res);
      } else {
        fs.unlink(filePath, err => {
          if (err) {
            throw new Error(err.message);
          }
        });
        this.logger.log(res);
        //   this.docService.fileUploaded(res);
      }
    });
  }
}

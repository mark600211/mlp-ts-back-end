/* eslint-disable @typescript-eslint/camelcase */
import { TryCatchWrapper } from '@app/models';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import tus = require('tus-node-server');
import { v4 as uuid } from 'uuid';
import { DocService } from '../doc/doc.service';
import { SynologyService } from '../synology/synology.service';
import { FileData } from '../models/file-data.model';
import { FileMetadata } from '../models/file-metadata.model';

@Injectable()
export class StorageService implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private readonly tusServer = new tus.Server();

  constructor(
    private readonly synologyService: SynologyService,
    private readonly docService: DocService,
  ) {}

  onModuleInit() {
    this.initializeTusServer();
  }

  async handleTus(req: Request, res: Response) {
    return this.tusServer.handle(req, res);
  }

  @TryCatchWrapper()
  private initializeTusServer(): void {
    this.tusServer.datastore = new tus.FileStore({
      path: '/tmp',
      namingFunction: this.fileNameFromRequest,
    });

    this.tusServer.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, event => {
      const upload_metadata = this.getFileMetadata(event.file.upload_metadata);

      const file = new FileData(
        event.file.id,
        event.file.upload_length,
        upload_metadata,
      );

      this.docService.createDoc(file);
      this.synologyService.uploadFile(file);
    });
  }

  private fileNameFromRequest = req => {
    try {
      const fileName: string = uuid();

      return fileName;
    } catch (e) {
      this.logger.error(e);

      // rethrow error
      throw e;
    }
  };

  @TryCatchWrapper()
  private getFileMetadata(data: any): FileMetadata {
    const uploadMeta: string = data;
    const metadata: FileMetadata = {} as FileMetadata;

    uploadMeta.split(',').map(item => {
      const tmp = item.split(' ');
      const key = tmp[0];
      const value = Buffer.from(tmp[1], 'base64').toString('ascii');
      metadata[`${key}`] = value;
    });
    let extension: string = metadata.filename
      ? metadata.filename.split('.').pop()
      : null;
    extension = extension && extension.length === 3 ? extension : null;
    metadata.extension = extension;

    return metadata;
  }
}

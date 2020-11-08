import { EntitiesService } from '@app/commands';
import {
  ActIdDoc,
  Doc,
  DocBase,
  Modules,
  Title,
  TryCatchWrapperAsync,
} from '@app/models';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Response } from '@app/proto/proto/build/syn';
import { FileData } from '../models/file-data.model';
import {
  PythonFilesServiceClient,
  PYTHON_FILES_SERVICE_NAME,
  File as F,
} from '@app/proto/proto/build/python-files';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class DocService implements OnModuleInit {
  pythonFilesService: PythonFilesServiceClient;

  constructor(
    private readonly entities: EntitiesService,
    @Inject(Modules.PYTHON) private pythonFileClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.pythonFilesService = this.pythonFileClient.getService<
      PythonFilesServiceClient
    >(PYTHON_FILES_SERVICE_NAME);
  }

  @TryCatchWrapperAsync()
  async downloadDoc(
    docId: string,
  ): Promise<{ observable: Observable<F>; name: string }> {
    const doc = await this.entities.findEntityByIdWithException(Doc, docId);

    const path = `${doc.synUrl}/${doc.name}`;

    const observable = this.pythonFilesService.downloadDoc({ path });

    const name = doc.name;

    return { observable, name };
  }

  @TryCatchWrapperAsync()
  async findLastDoc(id: string, title: Title): Promise<Doc> {
    const actId = await this.entities.findEntityByIdWithException(ActIdDoc, id);

    const entities = await this.entities.findWhereOrederedTaken(
      Doc,
      { actId, title },
      { createdAt: 'DESC' },
      1,
    );

    return entities[0];
  }

  @TryCatchWrapperAsync()
  async fileUploaded(res: Response): Promise<void> {
    const doc = await this.entities.findEntityByIdWithException(
      Doc,
      res.resData.docId,
    );
    doc.synUrl = res.resData.synUrl;
    await this.entities.updateEntityById(Doc, doc, doc.id);
  }

  @TryCatchWrapperAsync()
  async createDoc(file: FileData): Promise<void> {
    let actId = await this.entities.findOneWhere(ActIdDoc, {
      id: file.uploadMetadata.actId,
    });
    if (!actId) {
      actId = await this.entities.createEntity(ActIdDoc, {
        id: file.uploadMetadata.actId,
      });
    }
    const data: DocBase = {
      title: file.uploadMetadata.type,
      downloadable: true,
      name: file.uploadMetadata.filename,
      actId: actId,
    };
    await this.entities.createEntity(Doc, data);
  }
}

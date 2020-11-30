import { EntitiesService } from '@app/commands';
import {
  ActIdDoc,
  CGCTemplateModel,
  Doc,
  DocBase,
  Modules,
  Title,
  TryCatchWrapperAsync,
} from '@app/models';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Response } from '@app/proto/proto/build/syn';
import { FileData } from '../models/file-data.model';
import {
  PythonFilesServiceClient,
  PYTHON_FILES_SERVICE_NAME,
  TemplRes,
  File as F,
} from '@app/proto/proto/build/python_files';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    const observable = this.pythonFilesService.downloadFile({ path });

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
      title: Title[`${file.uploadMetadata.type}`],
      downloadable: true,
      name: file.uploadMetadata.filename,
      actId: actId,
    };
    await this.entities.createEntity(Doc, data);
  }

  @TryCatchWrapperAsync()
  async createDocFromTemplate(
    actId: string,
    rules: { path: string; cgc: CGCTemplateModel },
  ): Promise<Doc> {
    let act = await this.entities.findOneWhere(ActIdDoc, { id: actId });

    if (!act) {
      act = await this.entities.createEntity(ActIdDoc, { id: actId });
    }

    const res = await this.pythonFilesService
      .createDocFromTemplate({ actId, rules })
      .pipe(
        map(res => {
          if (!res.error) {
            const data: DocBase = {
              title: Title[`${res.resTmplData.title}`],
              downloadable: true,
              name: res.resTmplData.name,
              actId: act,
              synUrl: res.resTmplData.synUrl,
            };
            const doc = this.entities.createEntity(Doc, data);

            return doc;
          } else return res;
        }),
      )
      .toPromise();

    if ((res as TemplRes).error)
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'PYTHON_MODULE RESPONESE AS ERRRO',
        },
        HttpStatus.NO_CONTENT,
      );

    return res as Doc;
  }
}

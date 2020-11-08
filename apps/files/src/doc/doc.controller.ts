import {
  docId,
  File,
  FilesServiceController,
  FilesServiceControllerMethods,
} from '@app/proto/proto/build/files';
import { Controller } from '@nestjs/common';
import { Observable, Subject, from } from 'rxjs';
import {} from 'rxjs/operators';
import { DocService } from './doc.service';
@FilesServiceControllerMethods()
@Controller()
export class DocController implements FilesServiceController {
  constructor(private readonly docService: DocService) {}

  downloadDoc({ id }: docId): Observable<File> {
    const subject = new Subject<File>();

    const observable = from(this.docService.downloadDoc(id));

    observable.subscribe(val => {
      if (val.name) {
        subject.next({ name: val.name, chunk: undefined });
      }
      val.observable.subscribe(({ chunk }) => {
        subject.next({ chunk, name: undefined });
      });
    });

    return subject.asObservable();
  }
}

/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

export interface docId {
  id: string;
}

export interface File {
  chunk: Uint8Array | undefined;
  name: string | undefined;
}

export interface FilesServiceClient {
  downloadDoc(request: docId): Observable<File>;
}

export interface FilesServiceController {
  downloadDoc(request: docId): Observable<File>;
}

export function FilesServiceControllerMethods() {
  return function(constructor: Function) {
    const grpcMethods: string[] = ['downloadDoc'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      console.log(descriptor);

      GrpcMethod('FilesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('FilesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const protobufPackage = 'files_service';

export const FILES_SERVICE_PACKAGE_NAME = 'files_service';
export const FILES_SERVICE_NAME = 'FilesService';

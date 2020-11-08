/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface Path {
  path: string;
}

export interface File {
  chunk: Uint8Array;
}

export interface PythonFilesServiceClient {

  downloadDoc(request: Path): Observable<File>;

}

export interface PythonFilesServiceController {

  downloadDoc(request: Path): Observable<File>;

}

export function PythonFilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['downloadDoc'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('PythonFilesService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('PythonFilesService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'python_files_service'

export const PYTHON_FILES_SERVICE_PACKAGE_NAME = 'python_files_service'
export const PYTHON_FILES_SERVICE_NAME = 'PythonFilesService';
/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

export interface Path {
  path: string;
}

export interface File {
  chunk: Uint8Array;
}

export interface Response {
  resData: ResData | undefined;
  error: string | undefined;
}

export interface Request {
  chunk: Uint8Array | undefined;
  metadata: Metadata | undefined;
}

export interface Metadata {
  id: string;
  uploadLength: number;
  uploadMetadata: FileMetadata | undefined;
}

export interface FileMetadata {
  actId: string;
  filetype: string;
  filename: string;
  extension: string;
}

export interface ResData {
  docId: string;
  synUrl: string;
}

export interface PythonFilesServiceClient {
  downloadFile(request: Path): Observable<File>;

  uploadFile(request: Observable<Request>): Observable<Response>;
}

export interface PythonFilesServiceController {
  downloadFile(request: Path): Observable<File>;

  uploadFile(
    request: Observable<Request>,
  ): Promise<Response> | Observable<Response> | Response;
}

export function PythonFilesServiceControllerMethods() {
  return function(constructor: Function) {
    const grpcMethods: string[] = ['downloadFile'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('PythonFilesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = ['uploadFile'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('PythonFilesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const protobufPackage = 'python_files_service';

export const PYTHON_FILES_SERVICE_PACKAGE_NAME = 'python_files_service';
export const PYTHON_FILES_SERVICE_NAME = 'PythonFilesService';

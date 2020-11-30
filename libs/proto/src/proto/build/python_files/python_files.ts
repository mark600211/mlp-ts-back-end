/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface TemplRes {
  resTmplData: ResTmplData | undefined;
  error: string | undefined;
}

export interface ResTmplData {
  docId: string;
  synUrl: string;
  title: TitleType;
  name: string;
}

export interface TemplReq {
  actId: string;
  rules: Rules | undefined;
}

export interface Rules {
  path: string;
  cgc: CGC | undefined;
}

export interface CGC {
  customerId: string;
  generalCustomerId: string;
  printedCustomer: PrintType;
  printedGeneralCustomer: PrintType;
  isDefault: boolean;
}

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

  createDocFromTemplate(request: TemplReq): Observable<TemplRes>;

}

export interface PythonFilesServiceController {

  downloadFile(request: Path): Observable<File>;

  uploadFile(request: Observable<Request>): Promise<Response> | Observable<Response> | Response;

  createDocFromTemplate(request: TemplReq): Observable<TemplRes>;

}

export function PythonFilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['downloadFile', 'createDocFromTemplate'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('PythonFilesService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['uploadFile'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('PythonFilesService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'python_files_service'

export enum TitleType {
  UNKNOWN_TITLE_TYPE = 0,
  ACT = 1,
  ACT_PDF = 2,
  PROTOCOL = 3,
  FINAL_PROTOCOL = 4,
  UNRECOGNIZED = -1,
}

export enum PrintType {
  UNKNOWN_PRINT_TYPE = 0,
  SHORT_CUSTOMER = 1,
  LONG_CUSTOMER = 2,
  SHORT_GENERAL_CUSTOMER = 3,
  LONG_GENERAL_CUSTOMER = 4,
  EMPTY = 5,
  UNRECOGNIZED = -1,
}

export const PYTHON_FILES_SERVICE_PACKAGE_NAME = 'python_files_service'
export const PYTHON_FILES_SERVICE_NAME = 'PythonFilesService';
/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface Response {
  resData: ResData | undefined;
  error: string | undefined;
}

export interface Request {
  data: Data | undefined;
  metadata: Metadata | undefined;
}

export interface Metadata {
  id: string;
  uploadLength: number;
  uploadMetadata: FileMetadata | undefined;
}

export interface Data {
  chunk: Uint8Array;
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

export interface SynServiceClient {

  uploadFile(request: Observable<Request>): Observable<Response>;

}

export interface SynServiceController {

  uploadFile(request: Observable<Request>): Promise<Response> | Observable<Response> | Response;

}

export function SynServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('SynService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ['uploadFile'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('SynService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'syn_service'

export const SYN_SERVICE_PACKAGE_NAME = 'syn_service'
export const SYN_SERVICE_NAME = 'SynService';
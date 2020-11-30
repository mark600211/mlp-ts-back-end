/* eslint-disable */
import { Timestamp } from '../google/protobuf/timestamp';
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface actId {
  id: string;
}

export interface Path {
  path: string;
}

export interface Act {
  id: string;
  name: string;
  customer: Consumer | undefined;
  generalCustomer: Consumer | undefined;
  lab: Consumer | undefined;
  typeOfSample: Option | undefined;
  objectName: Option | undefined;
  place: Option | undefined;
  datetime: DateTime | undefined;
  method: Option | undefined;
  toolType: Option | undefined;
  climaticEnvironmental: Option | undefined;
  planning: Option | undefined;
  normativeDocuments: Option[];
  sampleType: Option | undefined;
  sample: Option[];
  preparation: Option[];
  goal: Option | undefined;
  definedIndicators: Option[];
  additions: Option | undefined;
  informationAboutSelection: Option | undefined;
  environmentalEngineer: Option | undefined;
  representative: Option | undefined;
  passedSample: Option | undefined;
  applications: Application[];
}

export interface DateTime {
  date: Timestamp | undefined;
  time: string;
}

export interface Application {
  place: string;
  datetime: DateTime | undefined;
}

export interface Consumer {
  id: string;
  fullname: string;
  label: string;
  address: Address | undefined;
  tel: string;
  email: string;
}

export interface Address {
  zip: string;
  country: string;
  region: string;
  city: string;
  street: string;
  building: string;
  room: string;
}

export interface Option {
  id: string;
  label: string;
}

export interface ActsServiceClient {

  getActForTemplater(request: actId): Observable<Act>;

  getFilePath(request: actId): Observable<Path>;

}

export interface ActsServiceController {

  getActForTemplater(request: actId): Promise<Act> | Observable<Act> | Act;

  getFilePath(request: actId): Promise<Path> | Observable<Path> | Path;

}

export function ActsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getActForTemplater', 'getFilePath'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ActsService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ActsService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'acts_service'

export const ACTS_SERVICE_PACKAGE_NAME = 'acts_service'
export const ACTS_SERVICE_NAME = 'ActsService';
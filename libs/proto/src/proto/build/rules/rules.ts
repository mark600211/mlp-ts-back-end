/* eslint-disable */
import { Observable } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';


export interface LabTOSReq {
  labId: string;
  typeOfSampleId: string;
}

export interface Path {
  path: string;
}

export interface CGCReq {
  customerId: string;
  generalCustomerId: string;
}

export interface CGCRes {
  isDefault: boolean | undefined;
  print: Print | undefined;
}

export interface Print {
  printedCustomer: string;
  printedGeneralCustomer: string;
}

export interface RulesServiceClient {

  getLabTOSRule(request: LabTOSReq): Observable<Path>;

  getCGCRule(request: CGCReq): Observable<CGCRes>;

}

export interface RulesServiceController {

  getLabTOSRule(request: LabTOSReq): Promise<Path> | Observable<Path> | Path;

  getCGCRule(request: CGCReq): Promise<CGCRes> | Observable<CGCRes> | CGCRes;

}

export function RulesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getLabTOSRule', 'getCGCRule'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('RulesService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('RulesService', method)(constructor.prototype[method], method, descriptor);
    }
  }
}

export const protobufPackage = 'rules_service'

export const RULES_SERVICE_PACKAGE_NAME = 'rules_service'
export const RULES_SERVICE_NAME = 'RulesService';
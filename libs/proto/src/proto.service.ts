import { Inject, Injectable } from '@nestjs/common';
import { PROTO_OPTIONS } from './constants';
import { ProtoModuleOptions } from './interfaces';
import { Modules } from '@app/models';
import * as path from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ProtoService {
  private readonly filePath: string;
  private readonly protoName: string;
  private readonly port: number;

  constructor(@Inject(PROTO_OPTIONS) options: ProtoModuleOptions) {
    let module: string;

    switch (options.module) {
      case Modules.ACTS:
        module = 'acts';
        break;
    }

    this.protoName = module;

    this.filePath = path.resolve('./libs/proto/src/proto', module);

    this.port = options.configService.get<number>('PROTO_PORT');
  }

  getServiceOptions(): ClientOptions {
    const serviceOptions: ClientOptions = {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${this.port}`,
        package: `${this.protoName}_service`,
        protoPath: `${this.filePath}/${this.protoName}.proto`,
      },
    };

    return serviceOptions;
  }
}

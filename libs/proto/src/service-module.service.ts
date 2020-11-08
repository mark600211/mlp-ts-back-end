import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@app/config';

@Injectable()
export class ServiceModuleService {
  private readonly filePath: string;
  private readonly protoName: string;
  private readonly port: number;

  constructor(
    @Inject('SERVICE_NAME') serviceName: string | null,
    private readonly configService: ConfigService,
  ) {
    this.protoName = serviceName;
    this.filePath = path.resolve('./libs/proto/src/proto', this.protoName);
    this.port = this.configService.get<number>('PROTO_PORT');
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
    return this.protoName ? serviceOptions : null;
  }
}

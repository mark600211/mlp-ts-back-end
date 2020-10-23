import { DynamicModule, Module } from '@nestjs/common';
import { ProtoService } from './proto.service';
import { ConfigModule } from '@app/config';
import { PROTO_OPTIONS } from './constants';
import { ProtoModuleOptions } from './interfaces/proto-options.interface';

@Module({
  imports: [ConfigModule],
  providers: [ProtoService],
  exports: [ProtoService],
})
export class ProtoModule {
  static register(options: ProtoModuleOptions): DynamicModule {
    return {
      module: ProtoModule,
      providers: [
        {
          provide: PROTO_OPTIONS,
          useValue: options,
        },
        ProtoService,
      ],
      exports: [ProtoService],
    };
  }
}

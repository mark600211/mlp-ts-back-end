import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';
import { ConfigModuleOptions } from './interfaces';

@Global()
@Module({})
export class ConfigModule {
  static register(optios: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: optios,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}

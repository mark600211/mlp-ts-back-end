import { ConfigService } from '@app/config';
import { Modules } from '@app/models';

export interface ProtoModuleOptions {
  module: Modules;
  configService: ConfigService;
}

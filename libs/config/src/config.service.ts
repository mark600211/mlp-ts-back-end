import { Inject, Injectable, Logger } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants';
import { EnvConfig, ConfigModuleOptions } from './interfaces';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path'

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  logger = new Logger(this.constructor.name);

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigModuleOptions) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;

    const envFile = path.join(options.folder, filePath)

    // const envFile = `${options.folder}/${filePath}`;

    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get<T>(key: string): T {
    let type: T;
    let result: any;

    const env = process.env[key];

    const envConf = this.envConfig[key];

    const checkInt = arg => {
      if (typeof type === 'number') {
        return Number(arg);
      } else {
        return arg;
      }
    };

    if (!env && envConf) {
      result = checkInt(envConf);
    }

    if (env) {
      result = checkInt(env);
    }

    if (!env && !envConf) {
      result = null;
    }

    return result as T;
  }
}

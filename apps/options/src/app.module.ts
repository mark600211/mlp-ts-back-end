import { ConfigModule } from '@app/config';
import { DbModule } from '@app/db';
import { Module } from '@nestjs/common';
import * as path from 'path';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [
    OptionsModule,
    DbModule.forRoot(),
    ConfigModule.register({ folder: path.resolve(__dirname, './config') }),
  ],
})
export class AppModule {}

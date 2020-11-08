import { ConfigModule } from '@app/config';
import { DbModule } from '@app/db';
import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import * as path from 'path';

@Module({
  imports: [
    TemplateModule,
    DbModule.forRoot(),
    ConfigModule.register({ folder: path.resolve(__dirname, './config') }),
  ],
})
export class AppModule {}

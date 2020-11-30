import { ConfigModule } from '@app/config';
import { DbModule } from '@app/db';
import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { CustomerGcustomerModule } from './customer-gcustomer/customer-gcustomer.module';
import * as path from 'path';
import { ProtoModule } from '@app/proto';
import { Modules } from '@app/models';
import { RulesController } from './rules.controller';

@Module({
  imports: [
    TemplateModule,
    DbModule.forRoot(),
    ConfigModule.register({ folder: path.resolve(__dirname, './config') }),
    ProtoModule.register([], Modules.RULES),
    CustomerGcustomerModule,
  ],
  controllers: [RulesController],
})
export class AppModule {}

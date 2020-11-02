import { Module } from '@nestjs/common';
import { CustomersModule } from './modules/customers/customers.module';
import { GeneralCustomersModule } from './modules/general-customers/general-customers.module';
import { LabsModule } from './modules/labs/labs.module';

@Module({
  imports: [CustomersModule, GeneralCustomersModule, LabsModule],
})
export class AppModule {}

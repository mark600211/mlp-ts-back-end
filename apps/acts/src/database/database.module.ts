import { Module } from '@nestjs/common';

import { DbModule } from '@app/db';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { GeneralCustomer } from '../modules/general-customers/models/general-customer.model';
import { Lab } from '../modules/labs/models/lab.model';
import { Doc } from '../modules/files/models/doc.model';
import { Customer } from '../modules/customers/models/customer.model';

@Module({
  imports: [
    DbModule.forRoot(),
    GraphQLFederationModule.forRoot({
      installSubscriptionHandlers: false,
      autoSchemaFile: true,
      introspection: true,
      buildSchemaOptions: {
        orphanedTypes: [Customer, GeneralCustomer, Lab, Doc],
      },
      playground: true,
    }),
  ],
})
export class DatabaseModule {}

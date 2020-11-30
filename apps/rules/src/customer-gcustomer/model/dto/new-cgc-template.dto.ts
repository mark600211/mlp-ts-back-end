import { PrintType } from '@app/models';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';

@InputType()
export class NewCGCTemplate {
  @Field()
  customerId: string;
  @Field()
  generalCustoemrId: string;
  @Field(type => PrintType)
  printedCustomer: PrintType;
  @Field(type => PrintType)
  printedGeneralCustomer: PrintType;
}
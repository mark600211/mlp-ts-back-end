import { PrintType } from '@app/models';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCGCTemplate {
  @Field(type => PrintType)
  printedCustomer: PrintType
  @Field(type => PrintType)
  printedGeneralCustomer: PrintType
}

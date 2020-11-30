import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindCGCTemplate {
  @Field()
  customerId: string;
  @Field()
  generalCustomerId: string;
}

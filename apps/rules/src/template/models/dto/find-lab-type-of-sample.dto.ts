import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindLabTypeOfSampleTemplate {
  @Field()
  customerId: string;
  @Field()
  generalCustomerId: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewDefinedIndicator {
  @Field()
  lable: string;
  @Field()
  lab: string;
  @Field()
  tos: string;
}

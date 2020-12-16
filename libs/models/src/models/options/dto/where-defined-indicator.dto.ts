import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WhereDefinedIndicator {
  @Field()
  lab: string;
  @Field()
  typeOfSample: string;
}

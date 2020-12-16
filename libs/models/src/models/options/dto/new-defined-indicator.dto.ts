import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewDefinedIndicator {
  @Field()
  label: string;
  @Field()
  lab: string;
  @Field()
  typeOfSample: string;
}

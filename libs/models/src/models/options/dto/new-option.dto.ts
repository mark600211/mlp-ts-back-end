import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewOption {
  @Field()
  label: string;
}

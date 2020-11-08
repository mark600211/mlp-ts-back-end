import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateLabTypeOfSampleTemplate {
  @Field()
  path: string;
}

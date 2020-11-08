import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindLabTypeOfSampleTemplate {
  @Field()
  labId: string;
  @Field()
  typeOfSampleId: string;
}

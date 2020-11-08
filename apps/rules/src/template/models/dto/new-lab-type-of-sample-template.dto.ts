import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewLabTypeOfSampleTemplate {
  @Field()
  labId: string;
  @Field()
  typeOfSampleId: string;
  @Field()
  path: string;
}

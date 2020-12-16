import { Act, Paginated } from '@app/models';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TableContent extends Paginated(Act) {
  @Field(type => [ID])
  uniqCustomers: string[];
  @Field(type => [ID])
  uniqGeneralCustomers: string[];
  @Field(type => [ID])
  uniqLabs: string[];
  @Field(type => [ID])
  uniqTypeOfSamples: string[];
}

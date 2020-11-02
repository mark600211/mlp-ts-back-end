import { InputType, Field } from '@nestjs/graphql';
import { Address } from '../address.model';

@InputType()
export class CreateConsumerDto {
  @Field()
  fullname: string;
  @Field()
  label: string;
  @Field(type => Address, { nullable: true })
  address?: Address;
  @Field(type => String, { nullable: true })
  tel?: string;
  @Field(type => String, { nullable: true })
  email?: string;
}

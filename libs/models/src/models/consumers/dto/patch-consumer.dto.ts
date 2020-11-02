import { InputType, Field } from '@nestjs/graphql';
import { Address } from '../address.model';

@InputType()
export class PatchConsumerDto {
  @Field()
  id: string;
  @Field(type => String, { nullable: true })
  fullname?: string;
  @Field(type => String, { nullable: true })
  label?: string;
  @Field(type => Address, { nullable: true })
  address?: Address;
  @Field(type => String, { nullable: true })
  tel?: string;
  @Field(type => String, { nullable: true })
  email?: string;
}

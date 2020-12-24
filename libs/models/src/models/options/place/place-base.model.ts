import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from '../base-options.model';

@Entity()
@ObjectType()
@InputType('InputPlace')
export class PlaceBase extends Option {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
}

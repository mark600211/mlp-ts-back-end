import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from '../base-options.model';

@Entity()
@ObjectType()
export class ToolTypeBase extends Option {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
}

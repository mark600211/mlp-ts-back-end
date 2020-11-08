import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { DocBase } from './doc-base.model';

@Entity()
@ObjectType()
export class Doc extends DocBase {
  @Field(type => ID)
  @PrimaryColumn()
  id: string;
  @Field()
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

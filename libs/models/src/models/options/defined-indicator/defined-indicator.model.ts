import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefinedIndicatorRelations } from './defined-indicator-relations.model';

@Entity()
@ObjectType()
export class DefinedIndicator extends DefinedIndicatorRelations {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
}

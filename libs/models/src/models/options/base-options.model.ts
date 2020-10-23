import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class BaseOption {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field()
  @Column()
  label: string;
}

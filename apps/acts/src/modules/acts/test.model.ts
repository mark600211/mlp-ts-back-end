import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Test {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  test: string;
}

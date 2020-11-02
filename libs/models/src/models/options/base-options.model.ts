import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Option {
  @Field()
  @Column()
  lable: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

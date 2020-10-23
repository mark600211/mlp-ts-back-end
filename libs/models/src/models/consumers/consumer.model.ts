import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Address } from './address.model';

@Entity()
@ObjectType()
export class Consumer {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field()
  @Column()
  fullname: string;
  @Field()
  @Column()
  label: string;
  @Field(type => Address)
  @Column(type => Address)
  address: Address;
  @Field({ nullable: true })
  @Column({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;
  @CreateDateColumn()
  createdAt?: Date;
  @CreateDateColumn()
  updatedAt?: Date;
}

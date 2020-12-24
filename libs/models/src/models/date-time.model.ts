import { Column, CreateDateColumn, Entity } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType('DateTimeInput')
@Entity()
@ObjectType()
export class DateAndTime {
  @Field(type => Date, { nullable: true })
  @CreateDateColumn({
    nullable: true,
    type: 'timestamp with time zone',
  })
  date?: Date;
  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  time?: string;
}

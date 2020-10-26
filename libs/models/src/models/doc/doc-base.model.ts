import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Title {
  ACT = 'ACT',
  ACT_PDF = 'ACT_PDF',
  PROTOCOL = 'PROTOCOL',
  FINAL_PROTOCOL = 'FINAL_PROTOCOL',
}

@Entity()
@ObjectType()
export class DocBase {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column({ type: 'enum', enum: Title, nullable: true })
  title?: string;
  @Field()
  @Column({ nullable: true })
  ydUrl?: string;
  @Field()
  @Column({ nullable: true })
  name?: string;
  @Field()
  @Column({ default: false })
  downloadable: boolean;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ActIdDoc } from './act-id.model';

export enum Title {
  ACT = 'ACT',
  ACT_PDF = 'ACT_PDF',
  PROTOCOL = 'PROTOCOL',
  FINAL_PROTOCOL = 'FINAL_PROTOCOL',
}

registerEnumType(Title, {
  name: 'Title',
});

@Entity()
@ObjectType()
export class DocBase {
  @Field()
  @Column({ type: 'enum', enum: Title, nullable: true })
  title?: string;
  @Field()
  @Column({ nullable: true })
  synUrl?: string;
  @Field()
  @Column({ nullable: true })
  name?: string;
  @Field()
  @Column({ default: false })
  downloadable: boolean;
  @ManyToOne(
    type => ActIdDoc,
    act => act.docs,
  )
  actId: ActIdDoc;
}

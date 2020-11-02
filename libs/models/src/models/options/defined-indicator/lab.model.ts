import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefinedIndicator } from '.';

@Entity()
export class LabId {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @OneToMany(
    type => DefinedIndicator,
    events => events,
    { nullable: true },
  )
  definedIndicators: DefinedIndicator[];
}

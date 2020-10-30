import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ActIdBase {
  @PrimaryColumn()
  id: string;
}

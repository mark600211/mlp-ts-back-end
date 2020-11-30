import { ObjectType, Field, ID, registerEnumType, InputType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column } from 'typeorm';

export enum PrintType {
  SHORT_CUSTOMER,
  LONG_CUSTOMER,
  SHORT_GENERAL_CUSTOMER,
  LONG_GENERAL_CUSTOMER,
  EMPTY
}

@Entity()
@InputType('CGCTemplateInput')
@ObjectType()
export class CGCTemplateModel {
  @Field(type => ID)
  @PrimaryColumn()
  customerId: string;
  @PrimaryColumn()
  @Field(type => ID)
  generalCustomerId: string;
  @Column({ type: 'enum', enum: PrintType, nullable: true })
  @Field(type => PrintType, { nullable: true })
  printedCustomer: PrintType
  @Column({ type: 'enum', enum: PrintType, nullable: true })
  @Field(type => PrintType, { nullable: true })
  printedGeneralCustomer: PrintType
  @Column({ type: 'boolean', default: true })
  @Field()
  isDefault: boolean 
}

registerEnumType(PrintType, {
  name: 'printType',
});

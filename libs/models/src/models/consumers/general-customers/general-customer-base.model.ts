import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class GeneralCustomerBase extends Consumer {}

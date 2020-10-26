import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { BaseOption } from '../base-options.model';

@Entity()
@ObjectType()
export class SampleBase extends BaseOption {}

import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { Option } from '../base-options.model';

@Entity()
@ObjectType()
export class MethodBase extends Option {}

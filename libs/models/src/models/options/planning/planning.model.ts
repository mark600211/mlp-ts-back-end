import { ObjectType } from '@nestjs/graphql';
import { Option } from '../base-options.model';

@ObjectType()
export class Planning extends Option {}

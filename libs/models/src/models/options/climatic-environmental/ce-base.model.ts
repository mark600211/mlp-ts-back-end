import { ObjectType } from '@nestjs/graphql';
import { Option } from '../base-options.model';

@ObjectType()
export class ClimaticEnvironmental extends Option {}

import { Field, InputType } from '@nestjs/graphql';
import { PatchOption } from './patch-option-base.dto';

@InputType()
export class PatchDefinedIndicator extends PatchOption {}

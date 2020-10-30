import { InputType, Field } from '@nestjs/graphql';
import { DateAndTime } from '../../date-time.model';

@InputType()
export class PatchAppDto {
  @Field()
  place?: string;
  @Field(type => DateAndTime)
  datetime?: DateAndTime;
}

import { InputType, Field, ID } from '@nestjs/graphql';
import { DateAndTime } from '../../date-time.model';

@InputType()
export class PatchAppDto {
  @Field(type => ID)
  id: string;
  @Field()
  place: string;
  @Field(type => DateAndTime)
  datetime: DateAndTime;
}

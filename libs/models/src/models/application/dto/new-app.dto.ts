import { InputType, Field, ID } from '@nestjs/graphql';
import { DateAndTime } from '../../date-time.model';

@InputType()
export class NewAppDto {
  @Field({ nullable: true })
  place?: string;
  @Field(type => DateAndTime, { nullable: true })
  datetime?: DateAndTime;
}

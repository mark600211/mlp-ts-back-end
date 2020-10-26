import { InputType, Field } from '@nestjs/graphql';
import { ApplicationBase } from '../../application';
import { DateAndTime } from '../../date-time.model';

@InputType()
export class NewActDto {
  @Field()
  name: string;
  @Field()
  customer: string;
  @Field()
  generalCustomer: string;
  @Field()
  lab: string;
  @Field()
  typeOfSample: string;
  @Field()
  objectName?: string;
  @Field()
  place?: string;
  @Field()
  datetime: DateAndTime;
  @Field()
  method?: string;
  @Field()
  toolType?: string;
  @Field()
  climaticEnvironmental?: string;
  @Field()
  planning?: string;
  @Field(type => [String])
  normativeDocument?: string[];
  @Field()
  sampleType?: string;
  @Field(type => [String])
  sample?: string[];
  @Field(type => [String])
  preparation?: string[];
  @Field()
  goal?: string;
  @Field(type => [String])
  definedIndicators?: string[];
  @Field()
  additions?: string;
  @Field()
  informationAboutSelection?: string;
  @Field()
  environmentalEngineer?: string;
  @Field()
  representative?: string;
  @Field()
  passedSample?: string;
  @Field(type => [ApplicationBase], { nullable: true })
  applications?: ApplicationBase[];
}

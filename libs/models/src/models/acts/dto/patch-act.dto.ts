import { InputType, Field } from '@nestjs/graphql';
import { ApplicationBase } from '../../application';
import { DateAndTime } from '../../date-time.model';

@InputType()
export class PatchActDto {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  customer: string;
  @Field({ nullable: true })
  generalCustomer: string;
  @Field({ nullable: true })
  lab: string;
  @Field({ nullable: true })
  typeOfSample: string;
  @Field({ nullable: true })
  objectName?: string;
  @Field({ nullable: true })
  place?: string;
  @Field({ nullable: true })
  datetime: DateAndTime;
  @Field({ nullable: true })
  method?: string;
  @Field({ nullable: true })
  toolType?: string;
  @Field({ nullable: true })
  climaticEnvironmental?: string;
  @Field({ nullable: true })
  planning?: string;
  @Field(type => [String], { nullable: true })
  normativeDocument?: string[];
  @Field({ nullable: true })
  sampleType?: string;
  @Field(type => String, { nullable: true })
  sample?: string;
  @Field(type => [String], { nullable: true })
  preparation?: string[];
  @Field({ nullable: true })
  goal?: string;
  @Field(ype => [String], { nullable: true })
  definedIndicators?: string[];
  @Field({ nullable: true })
  additions?: string;
  @Field({ nullable: true })
  informationAboutSelection?: string;
  @Field({ nullable: true })
  environmentalEngineer?: string;
  @Field({ nullable: true })
  representative?: string;
  @Field({ nullable: true })
  passedSample?: string;
  @Field(type => [ApplicationBase], { nullable: true })
  applications: ApplicationBase[];
}

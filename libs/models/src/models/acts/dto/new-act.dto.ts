import { InputType, Field } from '@nestjs/graphql';
import { ApplicationBase, NewAppDto, PatchAppDto } from '../../application';
import { DateAndTime } from '../../date-time.model';
import { Act } from '../act.model';

@InputType()
export class NewActDto {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  normativeDocuments?: string[];
  @Field({ nullable: true })
  sampleType?: string;
  @Field(type => String, { nullable: true })
  sample?: string;
  @Field(type => [String], { nullable: true })
  preparations?: string[];
  @Field({ nullable: true })
  goal?: string;
  @Field(type => [String], { nullable: true })
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
  @Field(type => [PatchAppDto], { nullable: true })
  applications?: PatchAppDto[];
}

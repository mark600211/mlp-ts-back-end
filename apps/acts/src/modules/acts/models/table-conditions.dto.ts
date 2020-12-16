import { Act } from '@app/models';
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
class Where {
  @Field(type => String)
  relation: keyof Act & string;
  @Field(type => [ID])
  ids: string[];
}

@InputType()
export class TableConditions {
  @Field(type => Int)
  skip: number;
  @Field(type => Int)
  take: number;
  @Field({ nullable: true })
  sort?: string;
  @Field({ nullable: true })
  sortDirection?: 'ASC' | 'DESC';
  @Field(type => [Where], { nullable: true })
  wheres?: Where[];
  @Field(type => Date, { nullable: true })
  dateRangeStart?: Date;
  @Field(type => Date, { nullable: true })
  dateRangeEnd?: Date;
}

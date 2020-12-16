import { Type } from '@nestjs/common';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(type => ID)
    cursor: string;

    @Field(type => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    // @Field(type => [EdgeType], { nullable: true })
    // edges: EdgeType[];
    @Field(type => [classRef], {
      name: `${classRef.name.toLocaleLowerCase()}s`,
    })
    nodes: T[];

    @Field(type => Int)
    totalCount: number;

    // @Field()
    // hasNextPage: boolean;
  }

  return PaginatedType;
}

import { Field, InputType } from "@nestjs/graphql";
import { CGCTemplateModel } from "../rules";

@InputType()
export class RulesDto {
    @Field()
    path: string
    @Field()
    cgc: CGCTemplateModel
}
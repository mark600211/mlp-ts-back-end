import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';
import { FindLabTypeOfSampleTemplate } from './models/dto/find-lab-type-of-sample.dto';
import { NewLabTypeOfSampleTemplate } from './models/dto/new-lab-type-of-sample-template.dto';
import { UpdateLabTypeOfSampleTemplate } from './models/dto/update-lab-tos-data.dto';
import { LabTypeOfSampleTemplateModel } from './models/lab-type-of-sample.rule.model';

@Resolver(of => LabTypeOfSampleTemplateModel)
export class LabTOSRuleTemplateResolver extends BaseResolver(
  LabTypeOfSampleTemplateModel,
  NewLabTypeOfSampleTemplate,
  null,
  false,
  null,
  null,
  FindLabTypeOfSampleTemplate,
  FindLabTypeOfSampleTemplate,
  UpdateLabTypeOfSampleTemplate,
) {}

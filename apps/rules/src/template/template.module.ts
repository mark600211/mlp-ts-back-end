import { BaseResolverModule } from '@app/resolvers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTypeOfSampleTemplateModel } from './models/lab-type-of-sample.rule.model';
import { LabTOSRuleTemplateResolver } from './template.resolver';
import { TemplateService } from './template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LabTypeOfSampleTemplateModel]),
    BaseResolverModule.register([
      {
        classRef: LabTypeOfSampleTemplateModel,
        serviceDataRef: TemplateService,
      },
    ]),
  ],
  providers: [TemplateService, LabTOSRuleTemplateResolver],
})
export class TemplateModule {}

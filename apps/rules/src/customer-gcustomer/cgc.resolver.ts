import { CGCTemplateModel, TryCatchWrapperAsync } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CGCService } from './cgc.service';
import { FindCGCTemplate, NewCGCTemplate, UpdateCGCTemplate } from './model';

@Resolver(of => CGCTemplateModel)
export class CGCResolver extends BaseResolver(
  CGCTemplateModel,
  NewCGCTemplate,
  null,
  false,
  null,
  null,
  FindCGCTemplate,
  FindCGCTemplate,
  UpdateCGCTemplate,
) {
  constructor(private readonly cgcService: CGCService) {
    super();
  }


  @Query(returns => CGCTemplateModel)
  @TryCatchWrapperAsync()
  async findOrCreateCGCRule(@Args('findCGCData') findCGCData: FindCGCTemplate): Promise<CGCTemplateModel> {
    return this.cgcService.findOrCreateCGC(findCGCData)
  }
}

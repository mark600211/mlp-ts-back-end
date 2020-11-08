import { Doc, Title, TryCatchWrapperAsync } from '@app/models';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { DocService } from './doc.service';

@Resolver(of => Doc)
export class DocResolver {
  constructor(private readonly docService: DocService) {}

  @Query(returns => Doc, { nullable: true })
  @TryCatchWrapperAsync()
  async getLastDocByActIdAndTitle(
    @Args('actId') actId: string,
    @Args('title', { type: () => Title }) title: Title,
  ): Promise<Doc> {
    return this.docService.findLastDoc(actId, title);
  }
}

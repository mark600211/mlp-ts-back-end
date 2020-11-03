import { Module } from '@nestjs/common';
import { ResolversService } from './resolvers.service';
import { BaseResolverModule } from './base-resolver/base-resolver.module';

@Module({
  providers: [ResolversService],
  exports: [ResolversService],
  imports: [BaseResolverModule],
})
export class ResolversModule {}

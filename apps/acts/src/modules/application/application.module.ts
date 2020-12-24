import { ApplicationBase } from '@app/models';
import { BaseResolverModule } from '@app/resolvers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationBase]),
    BaseResolverModule.register([
      {
        classRef: ApplicationBase,
        serviceDataRef: ApplicationService,
      },
    ]),
  ],
  providers: [ApplicationService, ApplicationResolver],
})
export class ApplicationModule {}

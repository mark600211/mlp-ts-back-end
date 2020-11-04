import { Application } from '@app/models';
import { BaseResolverModule } from '@app/resolvers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    BaseResolverModule.register([
      {
        classRef: Application,
        serviceDataRef: ApplicationService,
      },
    ]),
  ],
  providers: [ApplicationService, ApplicationResolver],
})
export class ApplicationModule {}

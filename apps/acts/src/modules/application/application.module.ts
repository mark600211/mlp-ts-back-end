import { Application } from '@app/models';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';
import { CommandHadlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Application])],
  providers: [
    ApplicationService,
    ApplicationResolver,
    ...CommandHadlers,
    ...QueryHandlers,
  ],
})
export class ApplicationModule {}

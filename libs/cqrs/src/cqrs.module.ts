import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsService } from './cqrs.service';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [CqrsService],
  exports: [CqrsModule],
})
export class CqrsIndividualModule {}

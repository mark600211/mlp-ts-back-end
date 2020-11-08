import { EntitiesModule } from '@app/commands/entities/entities.module';
import { ActIdDoc, Doc } from '@app/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocResolver } from './doc.resolver';
import { DocService } from './doc.service';
import { DocController } from './doc.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doc, ActIdDoc]),
    EntitiesModule.register(),
  ],
  providers: [DocService, DocResolver],
  exports: [DocService],
  controllers: [DocController],
})
export class DocModule {}

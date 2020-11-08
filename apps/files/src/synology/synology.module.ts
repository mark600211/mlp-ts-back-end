import { Module } from '@nestjs/common';
import { DocModule } from '../doc/doc.module';
import { SynologyService } from './synology.service';

@Module({
  imports: [DocModule],
  providers: [SynologyService],
  exports: [SynologyService],
})
export class SynologyModule {}

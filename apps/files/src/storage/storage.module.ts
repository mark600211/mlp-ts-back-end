import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DocModule } from '../doc/doc.module';
import { SynologyModule } from '../synology/synology.module';
import { StorageMiddleware } from './storage.middleware';
import { StorageService } from './storage.service';

@Module({
  imports: [SynologyModule, DocModule],
  providers: [StorageService],
})
export class StorageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StorageMiddleware)
      .forRoutes({ path: 'upload', method: RequestMethod.ALL });
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import tus from 'tus-node-server';
import { StorageService } from './storage.service';

const server = new tus.Server();
server.datastore = new tus.FileStore({
  path: '/file',
});

@Injectable()
export class StorageMiddleware implements NestMiddleware {
  constructor(private readonly storageService: StorageService) {}

  use(req: Request, res: Response, next: Function) {
    return this.storageService.handleTus(req, res);
  }
}

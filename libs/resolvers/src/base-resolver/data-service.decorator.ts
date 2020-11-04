import { Inject } from '@nestjs/common';
import { getDataServiceToken } from './token.service';

export function dataService(prefix: string) {
  return Inject(getDataServiceToken(prefix));
}

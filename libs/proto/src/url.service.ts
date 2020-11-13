import { Modules } from '@app/models';

function envCondition(): boolean {
  if (process.env.NODE_ENV === 'development') {
    return false;
  } else {
    return true;
  }
}

export function getUrl(name: string): string {
  switch (name) {
    case Modules.PYTHON:
      if (envCondition()) {
        return '0.0.0.0:50150';
      } else {
        return '0.0.0.0:50150';
      }
  }
}

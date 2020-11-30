import { Modules } from '@app/models';

function getHost(): string {
  if (process.env.NODE_ENV === 'development') {
    return '0.0.0.0';
  } else {
    return '0.0.0.0';
  }
}

export function getUrl(name: string): string {
  switch (name) {
    case Modules.PYTHON:
        return `${getHost()}:50150`;
  }
}

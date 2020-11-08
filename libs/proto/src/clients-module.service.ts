import { Modules } from '@app/models';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import path from 'path';

function createClientModule(name: string): ClientProviderOptions {
  const filePath = path.resolve('./libs/proto/src/proto', name);

  return {
    name,
    transport: Transport.GRPC,
    options: {
      package: `${name}_service`,
      protoPath: `${filePath}/${name}.proto`,
    },
  };
}

export function createClientModules(names: Modules[]): ClientProviderOptions[] {
  return names.map(name => createClientModule(name));
}

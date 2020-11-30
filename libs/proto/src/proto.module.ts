import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { Modules } from '@app/models';
import { createClientModules } from './clients-module.service';
import { ServiceModuleService } from './service-module.service';

@Global()
@Module({})
export class ProtoModule {
  static register(names: Modules[], serviceName?: Modules): DynamicModule {
    const imports = [ClientsModule.register(createClientModules(names))]

    const providers = serviceName
      ? [
          {
            provide: 'SERVICE_NAME',
            useValue: serviceName,
          },
          {
            provide: serviceName,
            useFactory: (grpcServiceOptions: ServiceModuleService) => {
              const options = grpcServiceOptions.getServiceOptions();
              return ClientProxyFactory.create({ ...options });
            },
            inject: [ServiceModuleService],
          },
          ServiceModuleService,
        ]
      : [];

    let exports = serviceName
      ? [ServiceModuleService]
      : [];

    if (names.length >= 1) exports = [...exports, ClientsModule]

    return {
      module: ProtoModule,
      imports,
      providers,
      exports,
    };
  }
}

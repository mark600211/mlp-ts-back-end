import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { Modules } from '@app/models';
import { createClientModules } from './clients-module.service';
import { ServiceModuleService } from './service-module.service';

@Global()
@Module({})
export class ProtoModule {
  static register(names: Modules[], serviceName?: Modules): DynamicModule {
    const imports =
      names.length >= 1
        ? [ClientsModule.register(createClientModules(names))]
        : [];

    console.log(serviceName);

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

    const exports = serviceName
      ? [names.length >= 1 ? ClientsModule : null, ServiceModuleService]
      : [names.length >= 1 ? ClientsModule : null];

    return {
      module: ProtoModule,
      imports,
      providers,
      exports,
    };
  }
}

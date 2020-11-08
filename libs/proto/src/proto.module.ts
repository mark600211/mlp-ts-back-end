import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { Modules } from '@app/models';
import { createClientModules } from './clients-module.service';
import { ServiceModuleService } from './service-module.service';

@Global()
@Module({})
export class ProtoModule {
  static register(names: Modules[], serviceName?: Modules): DynamicModule {
    const clientModules = createClientModules(names);

    const providers = serviceName
      ? [
          {
            provide: 'SERVICE_NAME',
            useValue: serviceName ? serviceName : null,
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
      ? [ClientsModule, ServiceModuleService]
      : [ClientsModule];

    return {
      module: ProtoModule,
      imports: [ClientsModule.register(clientModules)],
      providers,
      exports,
    };
  }
}

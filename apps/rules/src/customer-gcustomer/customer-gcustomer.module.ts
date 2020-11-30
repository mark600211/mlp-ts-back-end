import { EntitiesModule } from '@app/commands/entities/entities.module';
import { CGCTemplateModel } from '@app/models';
import { BaseResolverModule } from '@app/resolvers';
import { Module } from '@nestjs/common';
import { CGCResolver } from './cgc.resolver';
import { CGCService } from './cgc.service';

@Module({
    imports: [BaseResolverModule.register([{ 
        classRef: CGCTemplateModel,
        serviceDataRef: CGCService,
     }]),
     EntitiesModule.register()
    ],
    providers: [CGCService, CGCResolver]
})
export class CustomerGcustomerModule {}

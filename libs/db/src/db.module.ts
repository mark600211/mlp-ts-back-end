import { ConfigModule, ConfigService } from '@app/config';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';

@Global()
@Module({})
export class DbModule {
  static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('TYPEORM_HOST_DOCKER'),
            port: configService.get<number>('TYPEORM_PORT'),
            username: configService.get<string>('TYPEORM_USERNAME'),
            password: configService.get<string>('TYPEORM_PASSWORD'),
            database: configService.get<string>('TYPEORM_DATABASE'),
            autoLoadEntities: true,
            synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
            logging: configService.get<boolean>('TYPEORM_LOGGING'),
          }),
        }),
      ],
      providers: [DbService],
      exports: [DbService],
    };
  }
}
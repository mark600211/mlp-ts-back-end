import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [OptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

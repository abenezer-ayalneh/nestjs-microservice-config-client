import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigurationModule, PrismaModule, ApplicationModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigurationModule, PrismaModule],
})
export class AppModule {}

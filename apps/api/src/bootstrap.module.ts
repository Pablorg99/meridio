import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { RolesGuard } from './auth/security/roles.guard';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    EventSourcingModule.forRoot({
      mongoURL: process.env.MONGO_EVENT_STORE_URI,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class BootstrapModule {}

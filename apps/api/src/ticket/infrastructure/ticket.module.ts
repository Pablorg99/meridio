import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateTicketHandler } from '../application';
import { TicketController } from './controller';
import { ticketProviders } from './ticket.providers';

const commandHandlers = [CreateTicketHandler];

@Module({
  controllers: [TicketController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [...ticketProviders, ...commandHandlers],
})
export class TicketModule {}

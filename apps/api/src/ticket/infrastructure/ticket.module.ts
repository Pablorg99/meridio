import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateTicketHandler, FindTicketsByConferenceIdHandler } from '../application';
import { TicketController } from './controller';
import { UpdateTicketsProjectionOnTicketWasCreated } from './subscriber';
import { ticketProviders } from './ticket.providers';

const commandHandlers = [CreateTicketHandler];
const queryHandlers = [FindTicketsByConferenceIdHandler];
const subscribers = [UpdateTicketsProjectionOnTicketWasCreated];

@Module({
  controllers: [TicketController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [...ticketProviders, ...commandHandlers, ...queryHandlers, ...subscribers],
})
export class TicketModule {}

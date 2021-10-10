import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';

import { TicketsProjection, ticketsProjection, TicketWasCreated } from '../../domain';

@ViewUpdaterHandler(TicketWasCreated)
export class UpdateTicketsProjectionOnTicketWasCreated implements IViewUpdater<TicketWasCreated> {
  constructor(@Inject(ticketsProjection) private tickets: TicketsProjection) {}

  async handle(event: TicketWasCreated) {
    await this.tickets.save({
      id: event.id,
      buyerId: event.buyerId,
      conferenceId: event.conferenceId,
      assistantInfo: event.assistantInfo,
    });
  }
}

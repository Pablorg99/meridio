import { TicketDTO } from '@meridio/contracts';

import { UpdateTicketsProjectionOnTicketWasCreated } from '../../../src/ticket/infrastructure';
import { TicketWasCreatedMother } from '../domain/mother/ticket-was-created.mother';
import { TicketsMockProjection } from '../mock/tickets-projection.mock';

describe('UpdateTicketsProjectionOnTicketWasCreated', function () {
  it('should store a ticket dto in the projection from event data', function () {
    const event = TicketWasCreatedMother.random();
    const tickets = new TicketsMockProjection();
    const subscriber = new UpdateTicketsProjectionOnTicketWasCreated(tickets);

    subscriber.handle(event);

    const expectedDto: TicketDTO = {
      id: event.id,
      buyerId: event.buyerId,
      conferenceId: event.conferenceId,
      assistantInfo: event.assistantInfo,
    };

    expect(tickets.saveSpy).toHaveBeenCalledWith(expectedDto);
  });
});

import { TicketDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { FindTicketsByConferenceId, FindTicketsByConferenceIdHandler } from '../../../../../src/ticket/application';
import { TicketsMockProjection } from '../../../mock/tickets-projection.mock';

describe('FindTicketsByConferenceIdHandler', function () {
  it('should return all the tickets with the conference id passed', async function () {
    const query = new FindTicketsByConferenceId(faker.datatype.uuid());
    const tickets = [TicketDTOMother.random(), TicketDTOMother.random()];
    const projection = new TicketsMockProjection({ onFind: tickets });
    const handler = new FindTicketsByConferenceIdHandler(projection);

    const foundTickets = await handler.execute(query);

    expect(foundTickets).toStrictEqual(tickets);
  });
});

import { CreateConferenceDTOMother, CreateTicketDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

describe('View ticket', function () {
  const conference = CreateConferenceDTOMother.withLandingOpenAndUrl(faker.random.word());
  const ticket = CreateTicketDTOMother.forConference(conference.id);

  before(() => {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);
    cy.request('POST', 'http://localhost:3333/api/tickets', ticket);
  });

  it('should show the information of the ticket bought', function () {
    cy.visit(`${conference.slug}/ticket`);

    cy.findByText(ticket.assistantInfo.fullName);
    cy.findByText(ticket.assistantInfo.email);
  });
});

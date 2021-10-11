import { CreateConferenceDTOMother, CreateTicketDTOMother } from '@meridio/contracts';

describe('View ticket', function () {
  const conference = CreateConferenceDTOMother.readyForTicketSales();
  const ticket = CreateTicketDTOMother.forConference(conference.id);

  before(() => {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);
    cy.request('POST', 'http://localhost:3333/api/tickets', ticket);
  });

  it('should show the information of the ticket when already bought', function () {
    cy.visit(conference.slug);

    cy.findByRole('button', { name: 'Adquirir entrada' }).click();

    cy.findByText(ticket.assistantInfo.fullName);
    cy.findByText(ticket.assistantInfo.email);
  });
});

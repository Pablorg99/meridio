import { CreateConferenceDTOMother, CreateTicketDTOMother } from '@meridio/contracts';

describe('View ticket', function () {
  const conference = CreateConferenceDTOMother.readyForTicketSales();
  const ticket = CreateTicketDTOMother.forConference(conference.id);

  before(() => {
    cy.dbClean();
    cy.login().then((token) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/conferences',
        body: conference,
        headers: { Authorization: `Bearer ${token}` },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/tickets',
        body: ticket,
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });

  after(() => {
    cy.dbClean();
  });

  it('should show the information of the ticket when already bought', function () {
    cy.visit(conference.slug);

    cy.findByRole('button', { name: 'Adquirir entrada' }).click();

    cy.findByText(ticket.assistantInfo.fullName);
    cy.findByText(ticket.assistantInfo.email);
  });
});

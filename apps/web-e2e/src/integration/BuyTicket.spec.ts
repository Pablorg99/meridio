import { CreateConferenceDTOMother, CreateTicketDTOMother } from '@meridio/contracts';

describe('Buy ticket', function () {
  const conference = CreateConferenceDTOMother.readyForTicketSales();
  const ticket = CreateTicketDTOMother.random();

  before(() => {
    cy.dbClean();
    cy.login().then((token) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/conferences',
        body: conference,
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });

  after(() => {
    cy.dbClean();
  });

  it('should buy a ticket from the landing page', function () {
    cy.intercept('POST', '/tickets').as('createTicket');
    cy.visit(conference.slug);

    cy.findByRole('button', { name: 'Adquirir entrada' }).click();

    cy.findByRole('textbox', { name: 'Nombre completo' }).type(ticket.assistantInfo.fullName);
    cy.findByRole('textbox', { name: 'Email' }).type(ticket.assistantInfo.email);
    cy.findByRole('button', { name: 'Adquirir entrada' }).click();

    cy.wait('@createTicket').its('response.statusCode').should('be.equal', 201);
    cy.url().should('include', `/${conference.slug}`);
  });
});

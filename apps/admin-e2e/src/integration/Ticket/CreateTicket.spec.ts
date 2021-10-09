import { CreateConferenceDTOMother, CreateTicketDTOMother } from '@meridio/contracts';

describe('CreateConference', () => {
  const conference = CreateConferenceDTOMother.random();
  const ticket = CreateTicketDTOMother.random();

  before(() => {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);
  });

  it('filling the form creates a conference', () => {
    cy.intercept('POST', '/tickets').as('createTicket');
    cy.visit(`conference/${conference.id}/tickets/new`);

    cy.findByRole('textbox', { name: 'Nombre completo' }).type(ticket.assistantInfo.fullName);
    cy.findByRole('textbox', { name: 'Email' }).type(ticket.assistantInfo.email);
    cy.findByRole('button', { name: 'Adquirir entrada' }).click();

    cy.wait('@createTicket').its('response.statusCode').should('be.equal', 201);
  });
});

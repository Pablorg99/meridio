import { CreateConferenceDTOMother, CreateTicketDTOMother } from '@meridio/contracts';

describe('List tickets', function () {
  const conference = CreateConferenceDTOMother.random();
  const firstTicketFromConference = CreateTicketDTOMother.forConference(conference.id);
  const secondTicketFromConference = CreateTicketDTOMother.forConference(conference.id);
  const anotherTicket = CreateTicketDTOMother.random();

  before(() => {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);
    cy.request('POST', 'http://localhost:3333/api/tickets', firstTicketFromConference);
    cy.request('POST', 'http://localhost:3333/api/tickets', secondTicketFromConference);
    cy.request('POST', 'http://localhost:3333/api/tickets', anotherTicket);
  });

  it('should list all the tickets of a conference', function () {
    cy.visit(`conference/${conference.id}/tickets`);

    cy.findByText(firstTicketFromConference.assistantInfo.fullName);
    cy.findByText(firstTicketFromConference.assistantInfo.email);
    cy.findByText(secondTicketFromConference.assistantInfo.fullName);
    cy.findByText(secondTicketFromConference.assistantInfo.email);
    cy.findByText(anotherTicket.assistantInfo.fullName).should('not.exist');
    cy.findByText(anotherTicket.assistantInfo.email).should('not.exist');
  });
});

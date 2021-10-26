import { CreateConferenceDTOMother, CreateTicketDTOMother } from '@meridio/contracts';

describe('List tickets', function () {
  const conference = CreateConferenceDTOMother.random();
  const firstTicketFromConference = CreateTicketDTOMother.forConference(conference.id);
  const secondTicketFromConference = CreateTicketDTOMother.forConference(conference.id);
  const anotherTicket = CreateTicketDTOMother.random();

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
        body: firstTicketFromConference,
        headers: { Authorization: `Bearer ${token}` },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/tickets',
        body: secondTicketFromConference,
        headers: { Authorization: `Bearer ${token}` },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/tickets',
        body: anotherTicket,
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });

  after(() => {
    cy.dbClean();
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

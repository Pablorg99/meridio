import { CreateConferenceDTOMother, CreateProposalDTOMother } from '@meridio/contracts';

describe('List proposals', function () {
  const conference = CreateConferenceDTOMother.random();
  const firstProposalFromConference = CreateProposalDTOMother.forConference(conference.id);
  const secondProposalFromConference = CreateProposalDTOMother.forConference(conference.id);
  const anotherProposal = CreateProposalDTOMother.random();

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
        url: 'http://localhost:3333/api/proposals',
        body: firstProposalFromConference,
        headers: { Authorization: `Bearer ${token}` },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/proposals',
        body: secondProposalFromConference,
        headers: { Authorization: `Bearer ${token}` },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/proposals',
        body: anotherProposal,
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });

  after(() => {
    cy.dbClean();
  });

  it('should list all the proposals of a conference', function () {
    cy.visit(`conferences/${conference.id}/proposals`);

    cy.findByText(firstProposalFromConference.title);
    cy.findByText(firstProposalFromConference.speakerInfo.fullName);
    cy.findByText(secondProposalFromConference.title);
    cy.findByText(secondProposalFromConference.speakerInfo.fullName);
    cy.findByText(anotherProposal.title).should('not.exist');
  });
});

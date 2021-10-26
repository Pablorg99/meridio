import { CreateConferenceDTOMother, CreateProposalDTOMother } from '@meridio/contracts';

describe('View ticket', function () {
  const conference = CreateConferenceDTOMother.readyForCallForPapers();
  const firstProposal = CreateProposalDTOMother.forConference(conference.id);
  const secondProposal = CreateProposalDTOMother.forConference(conference.id);

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
        body: firstProposal,
        headers: { Authorization: `Bearer ${token}` },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/proposals',
        body: secondProposal,
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });

  after(() => {
    cy.dbClean();
  });

  it('should show the information of the ticket when already bought', function () {
    cy.visit(conference.slug);

    cy.findByRole('button', { name: 'Proponer una charla' }).click();

    cy.findByText(firstProposal.title);
    cy.findByText(secondProposal.title);
  });
});

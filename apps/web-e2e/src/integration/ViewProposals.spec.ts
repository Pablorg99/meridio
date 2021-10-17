import { CreateConferenceDTOMother, CreateProposalDTOMother } from '@meridio/contracts';

describe('View ticket', function () {
  const conference = CreateConferenceDTOMother.readyForCallForPapers();
  const firstProposal = CreateProposalDTOMother.forConference(conference.id);
  const secondProposal = CreateProposalDTOMother.forConference(conference.id);

  before(() => {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);
    cy.request('POST', 'http://localhost:3333/api/proposals', firstProposal);
    cy.request('POST', 'http://localhost:3333/api/proposals', secondProposal);
  });

  it('should show the information of the ticket when already bought', function () {
    cy.visit(conference.slug);

    cy.findByRole('button', { name: 'Proponer una charla' }).click();

    cy.findByText(firstProposal.title);
    cy.findByText(secondProposal.title);
  });
});

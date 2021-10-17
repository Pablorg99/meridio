import { CreateConferenceDTOMother, CreateProposalDTOMother } from '@meridio/contracts';

describe('List proposals', function () {
  const conference = CreateConferenceDTOMother.random();
  const firstProposalFromConference = CreateProposalDTOMother.forConference(conference.id);
  const secondProposalFromConference = CreateProposalDTOMother.forConference(conference.id);
  const anotherProposal = CreateProposalDTOMother.random();

  before(() => {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);
    cy.request('POST', 'http://localhost:3333/api/proposals', firstProposalFromConference);
    cy.request('POST', 'http://localhost:3333/api/proposals', secondProposalFromConference);
    cy.request('POST', 'http://localhost:3333/api/proposals', anotherProposal);
  });

  it('should list all the proposals of a conference', function () {
    cy.visit(`conference/${conference.id}/proposals`);

    cy.findByText(firstProposalFromConference.title);
    cy.findByText(firstProposalFromConference.speakerInfo.fullName);
    cy.findByText(secondProposalFromConference.title);
    cy.findByText(secondProposalFromConference.speakerInfo.fullName);
    cy.findByText(anotherProposal.title).should('not.exist');
  });
});

import { CreateConferenceDTOMother, CreateProposalDTOMother } from '@meridio/contracts';

describe('Create proposal', function () {
  const conference = CreateConferenceDTOMother.random();
  const proposal = CreateProposalDTOMother.random();

  before(() => {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);
  });

  it('should add a proposal from the admin', function () {
    cy.intercept('POST', '/proposals').as('createProposal');
    cy.visit(`conference/${conference.id}/proposals/new`);

    cy.findByRole('textbox', { name: 'Título' }).type(proposal.speakerInfo.fullName);
    cy.findByRole('textbox', { name: 'Descripción' }).type(proposal.speakerInfo.fullName);
    cy.findByRole('textbox', { name: 'Nombre completo' }).type(proposal.speakerInfo.fullName);
    cy.findByRole('textbox', { name: 'Email' }).type(proposal.speakerInfo.email);
    cy.findByRole('button', { name: 'Proponer charla' }).click();

    cy.wait('@createProposal').its('response.statusCode').should('be.equal', 201);
    cy.url().should('include', `/conference/${conference.id}/proposals`);
  });
});

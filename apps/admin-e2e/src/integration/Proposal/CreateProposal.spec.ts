import { CreateConferenceDTOMother, CreateProposalDTOMother } from '@meridio/contracts';

describe('Create proposal', function () {
  const conference = CreateConferenceDTOMother.random();
  const proposal = CreateProposalDTOMother.random();

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

  it('should add a proposal from the admin', function () {
    cy.intercept('POST', '/proposals').as('createProposal');
    cy.visit(`conferences/${conference.id}/proposals/new`);

    cy.findByRole('textbox', { name: 'Título de la charla' }).type(proposal.speakerInfo.fullName);
    cy.findByRole('textbox', { name: 'Descripción de la charla' }).type(proposal.speakerInfo.fullName);
    cy.findByRole('textbox', { name: 'Tu nombre completo' }).type(proposal.speakerInfo.fullName);
    cy.findByRole('textbox', { name: 'Tu email de contacto' }).type(proposal.speakerInfo.email);
    cy.findByRole('button', { name: 'Proponer charla' }).click();

    cy.wait('@createProposal').its('response.statusCode').should('be.equal', 201);
    cy.url().should('include', `/conferences/${conference.id}/proposals`);
  });
});

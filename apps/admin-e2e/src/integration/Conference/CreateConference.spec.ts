import { CreateConferenceDTOMother } from '@meridio/contracts';

describe('CreateConference', () => {
  before(() => {
    cy.dbClean();
    cy.login();
  });

  after(() => {
    cy.dbClean();
  });

  const conference = CreateConferenceDTOMother.random();

  it('filling the form creates a conference', () => {
    cy.visit('/conferences/new');
    cy.intercept('POST', '/conferences').as('createConference');

    cy.findByRole('textbox', { name: 'Nombre de la conferencia' }).type(conference.name);
    cy.findByRole('textbox', { name: 'Enlance a la página de conferencia' }).type(conference.slug);
    cy.findByRole('textbox', { name: 'Lugar de celebración' }).type(conference.place);
    cy.findByLabelText('Fecha de inicio').type(conference.startDate);
    cy.findByLabelText('Fecha de fin').type(conference.endDate);
    cy.findByRole('button', { name: 'Crear conferencia' }).click();

    cy.wait('@createConference').its('response.statusCode').should('be.equal', 201);
  });
});

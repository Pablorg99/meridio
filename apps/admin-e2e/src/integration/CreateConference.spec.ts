import { CreateConferenceDTOMother } from '@meridio/contracts';

describe('CreateConference', () => {
  before(() => {
    cy.visit('/conference/new');
  });

  const conference = CreateConferenceDTOMother.random();

  it('filling the form creates a conference', () => {
    cy.intercept('POST', '/conferences').as('createConference');

    cy.findByRole('textbox', { name: 'Nombre de la conferencia' }).type(conference.name);
    cy.findByRole('textbox', { name: 'Enlace para la página principal' }).type(conference.url);
    cy.findByRole('textbox', { name: 'Lugar de celebración' }).type(conference.place);
    cy.findByLabelText('Fecha de inicio').type(conference.startDate);
    cy.findByLabelText('Fecha de fin').type(conference.endDate);
    cy.findByRole('button', { name: 'Crear conferencia' }).click();

    cy.wait('@createConference').its('response.statusCode').should('be.equal', 201);
  });
});

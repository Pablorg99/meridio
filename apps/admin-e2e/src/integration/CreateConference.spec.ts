import * as faker from 'faker';

describe('CreateConference', () => {
  before(() => {
    cy.visit('/conference/new');
  });

  const conferenceName = faker.random.word();
  const conferenceUrl = `${faker.internet.url()}/${faker.datatype.number()}`;
  const conferencePlace = faker.random.word();
  const startDate = faker.date.soon().toISOString().split('T')[0];
  const endDate = faker.date.future().toISOString().split('T')[0];

  it('filling the form creates a conference', () => {
    cy.intercept('POST', '/conferences').as('createConference');

    cy.findByRole('textbox', { name: 'Nombre de la conferencia' }).type(conferenceName);
    cy.findByRole('textbox', { name: 'Enlace para la página principal' }).type(conferenceUrl);
    cy.findByRole('textbox', { name: 'Lugar de celebración' }).type(conferencePlace);
    cy.findByLabelText('Fecha de inicio').type(startDate);
    cy.findByLabelText('Fecha de fin').type(endDate);
    cy.findByRole('button', { name: 'Crear conferencia' }).click();

    cy.wait('@createConference').its('response.statusCode').should('be.equal', 201);
  });
});

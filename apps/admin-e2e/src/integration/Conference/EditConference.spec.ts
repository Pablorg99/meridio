import { CreateConferenceDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

describe('EditConference', function () {
  const conference = CreateConferenceDTOMother.random();
  const updatedPlace = faker.random.word();
  const updatedEndDate = faker.date.future().toISOString().split('T')[0];

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

  it('should update some fields of the existing conference', function () {
    cy.visit(`conference/edit/${conference.id}`);

    cy.findByRole('textbox', { name: 'Lugar de celebración' }).clear();
    cy.findByRole('textbox', { name: 'Lugar de celebración' }).type(updatedPlace);
    cy.findByLabelText('Fecha de fin').clear();
    cy.findByLabelText('Fecha de fin').type(updatedEndDate);
    cy.findByRole('button', { name: 'Crear conferencia' }).click();

    cy.visit(`conference/${conference.id}`);

    cy.findByText(conference.name);
    cy.findByText(conference.slug);
    cy.findByText(updatedPlace);
    cy.findByText(conference.startDate);
    cy.findByText(updatedEndDate);
  });
});

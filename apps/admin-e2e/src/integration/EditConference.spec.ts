import { CreateConferenceDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

describe('EditConference', function () {
  const conference = CreateConferenceDTOMother.random();
  const updatedPlace = faker.random.word();
  const updatedEndDate = faker.date.future().toISOString().split('T')[0];

  it('should update some fields of the existing conference', function () {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);

    cy.visit(`conference/edit/${conference.id}`);

    cy.findByRole('textbox', { name: 'Lugar de celebración' }).clear();
    cy.findByRole('textbox', { name: 'Lugar de celebración' }).type(updatedPlace);
    cy.findByLabelText('Fecha de fin').clear();
    cy.findByLabelText('Fecha de fin').type(updatedEndDate);
    cy.findByRole('button', { name: 'Crear conferencia' }).click();

    cy.visit(`conference/${conference.id}`);

    cy.findByText(conference.name);
    cy.findByText(conference.url);
    cy.findByText(updatedPlace);
    cy.findByText(conference.startDate);
    cy.findByText(updatedEndDate);
  });
});

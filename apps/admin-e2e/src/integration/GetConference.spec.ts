import { CreateConferenceDTOMother } from '@meridio/contracts';

describe('GetConference', function () {
  const conference = CreateConferenceDTOMother.random();

  it('should show the information about the created conference', function () {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);

    cy.visit(`conference/${conference.id}`);

    cy.findByText(conference.name);
    cy.findByText(conference.slug);
    cy.findByText(conference.place);
    cy.findByText(conference.startDate);
    cy.findByText(conference.endDate);
  });
});

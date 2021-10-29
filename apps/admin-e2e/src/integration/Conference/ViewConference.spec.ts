import { CreateConferenceDTOMother } from '@meridio/contracts';

describe('ViewConference', function () {
  const conference = CreateConferenceDTOMother.random();

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

  it('should show the information about the created conference', function () {
    cy.visit(`conferences/${conference.id}`);

    cy.findByDisplayValue(conference.name);
    cy.findByDisplayValue(conference.slug);
    cy.findByDisplayValue(conference.place);
    cy.findByDisplayValue(conference.startDate);
    cy.findByDisplayValue(conference.endDate);
  });
});

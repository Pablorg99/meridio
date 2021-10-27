import { CreateConferenceDTOMother } from '@meridio/contracts';

describe('GetConference', function () {
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

    cy.findByText(conference.name);
    cy.findByText(conference.slug);
    cy.findByText(conference.place);
    cy.findByText(conference.startDate);
    cy.findByText(conference.endDate);
  });
});

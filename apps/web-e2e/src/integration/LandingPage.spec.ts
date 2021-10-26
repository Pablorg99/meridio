import { CreateConferenceDTOMother } from '@meridio/contracts';

describe('LandingPage', function () {
  const conference = CreateConferenceDTOMother.withLandingPageOpen();

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

  it('should show the conference info when visiting the landing page', function () {
    cy.visit(conference.slug);

    cy.findByText(conference.name);
    cy.findByText(conference.slug);
    cy.findByText(conference.place);
    cy.findByText(conference.startDate);
    cy.findByText(conference.endDate);
  });
});

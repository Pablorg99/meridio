import { CreateConferenceDTOMother } from '@meridio/contracts';

describe('ListConferences', function () {
  const firstConference = CreateConferenceDTOMother.random();
  const secondConference = CreateConferenceDTOMother.random();

  before(() => {
    cy.dbClean();
    cy.login().then((token) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/conferences',
        body: firstConference,
        headers: { Authorization: `Bearer ${token}` },
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:3333/api/conferences',
        body: secondConference,
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });

  after(() => {
    cy.dbClean();
  });

  it('should list the conferences created', function () {
    cy.visit(`conferences`);

    cy.findByText(firstConference.name);
    cy.findByText(secondConference.name);
  });
});

import { CreateConferenceDTO, CreateConferenceDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

describe('LandingPage', function () {
  let conferenceUrl: string;
  let conference: CreateConferenceDTO;

  before(() => {
    conferenceUrl = faker.random.word();
    conference = CreateConferenceDTOMother.withLandingOpenAndUrl(conferenceUrl);
  });

  it('should show the conference info when visiting the landing page', function () {
    cy.request('POST', 'http://localhost:3333/api/conferences', conference);

    cy.visit(`/${conferenceUrl}`);

    cy.findByText(conference.name);
    cy.findByText(conference.slug);
    cy.findByText(conference.place);
    cy.findByText(conference.startDate);
    cy.findByText(conference.endDate);
  });
});

import * as faker from 'faker';

import { ConferenceDTO } from './conference.dto';

export class ConferenceDTOMother {
  static random(): ConferenceDTO {
    return {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      slug: faker.random.word(),
      place: faker.random.word(),
      startDate: faker.date.soon().toISOString().split('T')[0],
      endDate: faker.date.future().toISOString().split('T')[0],
      isLandingPageOpen: faker.datatype.boolean(),
      isCallForPapersOpen: faker.datatype.boolean(),
      isTicketSalesOpen: faker.datatype.boolean(),
    };
  }

  static withId(id: string): ConferenceDTO {
    return {
      ...ConferenceDTOMother.random(),
      id,
    };
  }

  static withLandingOpenAndSlug(slug: string): ConferenceDTO {
    return {
      ...ConferenceDTOMother.random(),
      slug,
      isLandingPageOpen: true,
    };
  }

  static withLandingClosedAndSlug(slug: string): ConferenceDTO {
    return {
      ...ConferenceDTOMother.random(),
      slug,
      isLandingPageOpen: false,
    };
  }
}

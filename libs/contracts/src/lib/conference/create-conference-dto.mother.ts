import * as faker from 'faker';

import { CreateConferenceDTO } from './create-conference.dto';

export class CreateConferenceDTOMother {
  static random(): CreateConferenceDTO {
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

  static withLandingPageOpen(): CreateConferenceDTO {
    return {
      ...CreateConferenceDTOMother.random(),
      isLandingPageOpen: true,
    };
  }

  static readyForTicketSales(): CreateConferenceDTO {
    return {
      ...CreateConferenceDTOMother.random(),
      isLandingPageOpen: true,
      isTicketSalesOpen: true,
    };
  }

  static readyForCallForPapers(): CreateConferenceDTO {
    return {
      ...CreateConferenceDTOMother.random(),
      isLandingPageOpen: true,
      isCallForPapersOpen: true,
    };
  }
}

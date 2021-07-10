import * as faker from 'faker';

import { ConferenceDTO } from './conference.dto';

export class ConferenceDTOMother {
  static withId(id: string): ConferenceDTO {
    return {
      id,
      name: faker.random.word(),
      url: `${faker.internet.url()}/${faker.datatype.number()}`,
      place: faker.random.word(),
      startDate: faker.date.soon().toISOString().split('T')[0],
      endDate: faker.date.future().toISOString().split('T')[0],
      isLandingPageOpen: faker.datatype.boolean(),
      isCallForPapersOpen: faker.datatype.boolean(),
      isTicketSalesOpen: faker.datatype.boolean(),
    };
  }
}

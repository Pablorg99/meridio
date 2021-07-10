import * as faker from 'faker';

import { ConferenceWasCreated } from '../../../../src/conference/domain';

export class ConferenceWasCreatedMother {
  static random() {
    return new ConferenceWasCreated({
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      url: `${faker.internet.url()}/${faker.datatype.number()}`,
      place: faker.random.word(),
      startDate: faker.date.soon().getTime(),
      endDate: faker.date.future().getTime(),
      isLandingPageOpen: faker.datatype.boolean(),
      isCallForPapersOpen: faker.datatype.boolean(),
      isTicketSalesOpen: faker.datatype.boolean(),
    });
  }
}

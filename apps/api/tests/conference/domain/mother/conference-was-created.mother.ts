import * as faker from 'faker';

import { ConferenceWasCreated } from '../../../../src/conference/domain';

export class ConferenceWasCreatedMother {
  static random() {
    return new ConferenceWasCreated({
      id: faker.datatype.uuid(),
      ownerId: faker.datatype.uuid(),
      name: faker.random.word(),
      slug: faker.random.word(),
      place: faker.random.word(),
      startDate: faker.date.soon().getTime(),
      endDate: faker.date.future().getTime(),
      isLandingPageOpen: faker.datatype.boolean(),
      isCallForPapersOpen: faker.datatype.boolean(),
      isTicketSalesOpen: faker.datatype.boolean(),
    });
  }
}

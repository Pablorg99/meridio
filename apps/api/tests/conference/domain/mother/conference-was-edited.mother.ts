import * as faker from 'faker';

import { ConferenceWasEdited } from '../../../../src/conference/domain';

export class ConferenceWasEditedMother {
  static random() {
    return new ConferenceWasEdited({
      id: faker.datatype.uuid(),
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

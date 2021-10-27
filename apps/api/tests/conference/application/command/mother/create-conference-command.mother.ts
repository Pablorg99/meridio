import * as faker from 'faker';

import { CreateConferenceCommand } from '../../../../../src/conference/application';

export class CreateConferenceCommandMother {
  static random() {
    return new CreateConferenceCommand({
      id: faker.datatype.uuid(),
      ownerId: faker.datatype.uuid(),
      name: faker.random.word(),
      slug: faker.random.word(),
      place: faker.random.word(),
      startDate: new Date(faker.date.soon()),
      endDate: new Date(faker.date.future()),
      isLandingPageOpen: faker.datatype.boolean(),
      isCallForPapersOpen: faker.datatype.boolean(),
      isTicketSalesOpen: faker.datatype.boolean(),
    });
  }
}

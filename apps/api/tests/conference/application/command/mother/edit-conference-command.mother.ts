import * as faker from 'faker';

import { EditConferenceCommand } from '../../../../../src/conference/application';

export class EditConferenceCommandMother {
  static forId(id: string) {
    return new EditConferenceCommand({
      id,
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

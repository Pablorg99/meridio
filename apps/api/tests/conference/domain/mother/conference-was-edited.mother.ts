import * as faker from 'faker';

import { ConferenceWasEdited } from '../../../../src/conference/domain';

export class ConferenceWasEditedMother {
  static random() {
    return new ConferenceWasEdited({
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      url: `${faker.internet.url()}/${faker.datatype.number()}`,
      place: faker.random.word(),
      startDate: faker.date.soon().getTime(),
      endDate: faker.date.future().getTime(),
    });
  }
}
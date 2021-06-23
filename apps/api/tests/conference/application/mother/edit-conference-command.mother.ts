import * as faker from 'faker';

import { EditConferenceCommand } from '../../../../src/conference/application';

export class EditConferenceCommandMother {
  static forId(id: string) {
    return new EditConferenceCommand({
      id,
      name: faker.random.word(),
      url: `${faker.internet.url()}/${faker.datatype.number()}`,
      place: faker.random.word(),
      startDate: new Date(faker.date.soon()),
      endDate: new Date(faker.date.future()),
    });
  }
}

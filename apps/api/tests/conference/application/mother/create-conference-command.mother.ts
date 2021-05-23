import * as faker from 'faker';

import { CreateConferenceCommand } from '../../../../src/conference/application/command';



export class CreateConferenceCommandMother {
  static random() {
    return new CreateConferenceCommand({
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      url: faker.internet.url() + '/' + faker.datatype.number(),
      place: faker.random.word(),
      startDate: new Date(faker.date.soon()),
      endDate: new Date(faker.date.future()),
    });
  }
}

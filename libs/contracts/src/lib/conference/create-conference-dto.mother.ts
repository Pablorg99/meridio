import * as faker from 'faker';

import { CreateConferenceDTO } from './create-conference.dto';

export class CreateConferenceDTOMother {
  static random(): CreateConferenceDTO {
    return {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      url: `${faker.internet.url()}/${faker.datatype.number()}`,
      place: faker.random.word(),
      startDate: faker.date.soon().toISOString().split('T')[0],
      endDate: faker.date.future().toISOString().split('T')[0],
    }
  }

  static withId(id: string) {
    const conferenceDTO = this.random()
    return {
      ...conferenceDTO,
      id: id
    }
  }
}

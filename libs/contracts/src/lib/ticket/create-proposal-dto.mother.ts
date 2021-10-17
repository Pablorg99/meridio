import { CreateProposalDTO } from '@meridio/contracts';
import * as faker from 'faker';

export class CreateProposalDTOMother {
  static random(): CreateProposalDTO {
    return {
      id: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      title: faker.random.word(),
      description: faker.random.words(),
      speakerInfo: {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
      },
    };
  }

  static forConference(conferenceId: string) {
    return {
      ...this.random(),
      conferenceId,
    };
  }
}

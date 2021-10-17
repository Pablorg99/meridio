import * as faker from 'faker';

import { ProposalDTO } from './proposal.dto';

export class ProposalDTOMother {
  static random(): ProposalDTO {
    return {
      id: faker.datatype.uuid(),
      ownerId: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      title: faker.random.word(),
      description: faker.random.words(),
      speakerInfo: {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
      },
    };
  }
}

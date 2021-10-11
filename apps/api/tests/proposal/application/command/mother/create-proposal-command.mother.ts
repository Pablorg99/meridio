import { UserInfoDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { CreateProposalCommand } from '../../../../../src/proposal/application';

export class CreateProposalCommandMother {
  static random() {
    return new CreateProposalCommand({
      id: faker.datatype.uuid(),
      ownerId: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      title: faker.random.word(),
      description: faker.random.words(),
      speakerInfo: UserInfoDTOMother.random(),
    });
  }
}

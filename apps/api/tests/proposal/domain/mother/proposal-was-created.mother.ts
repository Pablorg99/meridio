import { UserInfoDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { ProposalWasCreated } from '../../../../src/proposal/domain';

export class ProposalWasCreatedMother {
  static random() {
    return new ProposalWasCreated({
      id: faker.datatype.uuid(),
      ownerId: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      title: faker.random.word(),
      description: faker.random.words(),
      speakerInfo: UserInfoDTOMother.random(),
    });
  }
}

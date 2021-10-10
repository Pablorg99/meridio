import { UserInfoDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { TicketWasCreated } from '../../../../src/ticket/domain';

export class TicketWasCreatedMother {
  static random() {
    return new TicketWasCreated({
      id: faker.datatype.uuid(),
      buyerId: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      assistantInfo: UserInfoDTOMother.random(),
    });
  }
}

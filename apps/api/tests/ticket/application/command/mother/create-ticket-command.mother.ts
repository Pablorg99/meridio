import { UserInfoDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { CreateTicketCommand } from '../../../../../src/ticket/application';

export class CreateTicketCommandMother {
  static random() {
    return new CreateTicketCommand({
      id: faker.datatype.uuid(),
      buyerId: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      assistantInfo: UserInfoDTOMother.random(),
    });
  }
}

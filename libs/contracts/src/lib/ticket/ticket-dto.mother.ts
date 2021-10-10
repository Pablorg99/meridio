import { TicketDTO } from '@meridio/contracts';
import * as faker from 'faker';

export class TicketDTOMother {
  static random(): TicketDTO {
    return {
      id: faker.datatype.uuid(),
      buyerId: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      assistantInfo: {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
      },
    };
  }
}

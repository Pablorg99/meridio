import { CreateTicketDTO } from '@meridio/contracts';
import * as faker from 'faker';

export class CreateTicketDTOMother {
  static random(): CreateTicketDTO {
    return {
      id: faker.datatype.uuid(),
      conferenceId: faker.datatype.uuid(),
      assistantInfo: {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
      },
    };
  }

  static forConference(conferenceId: string): CreateTicketDTO {
    return {
      ...CreateTicketDTOMother.random(),
      conferenceId,
    };
  }
}

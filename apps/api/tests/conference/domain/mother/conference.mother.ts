import * as faker from 'faker';

import { CreateConferenceCommand } from '../../../../src/conference/application';
import {
  Conference,
  ConferenceDateRange,
  ConferenceId,
  ConferenceName,
  ConferencePlace,
  ConferenceUrl,
} from '../../../../src/conference/domain';

export class ConferenceMother {
  static fromCommand(command: CreateConferenceCommand) {
    return Conference.create({
      id: ConferenceId.fromString(command.id),
      name: ConferenceName.fromString(command.name),
      url: ConferenceUrl.fromString(command.url),
      place: ConferencePlace.fromString(command.place),
      dateRange: ConferenceDateRange.fromStartAndEndDate(command.startDate, command.endDate),
    });
  }

  static random() {
    return Conference.create({
      id: ConferenceId.fromString(faker.datatype.uuid()),
      name: ConferenceName.fromString(faker.random.word()),
      url: ConferenceUrl.fromString(`${faker.internet.url()}/${faker.datatype.number(1000)}`),
      place: ConferencePlace.fromString(faker.random.word()),
      dateRange: ConferenceDateRange.fromStartAndEndDate(faker.date.soon(), faker.date.future()),
    });
  }

  static forId(id: ConferenceId) {
    return Conference.create({
      id,
      name: ConferenceName.fromString(faker.random.word()),
      url: ConferenceUrl.fromString(`${faker.internet.url()}/${faker.datatype.number(1000)}`),
      place: ConferencePlace.fromString(faker.random.word()),
      dateRange: ConferenceDateRange.fromStartAndEndDate(faker.date.soon(), faker.date.future()),
    });
  }
}

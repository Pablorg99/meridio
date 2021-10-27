import * as faker from 'faker';

import { CreateConferenceCommand } from '../../../../src/conference/application';
import {
  Conference,
  ConferenceDateRange,
  ConferenceName,
  ConferencePlace,
  ConferenceSettings,
  ConferenceSlug,
} from '../../../../src/conference/domain';
import { ConferenceId, UserId } from '../../../../src/shared/domain';

export class ConferenceMother {
  static fromCommand(command: CreateConferenceCommand) {
    return Conference.create({
      id: ConferenceId.fromString(command.id),
      ownerId: UserId.fromString(command.ownerId),
      name: ConferenceName.fromString(command.name),
      slug: ConferenceSlug.fromString(command.slug),
      place: ConferencePlace.fromString(command.place),
      dateRange: ConferenceDateRange.fromStartAndEndDate(command.startDate, command.endDate),
      settings: ConferenceSettings.fromValues(
        command.isLandingPageOpen,
        command.isCallForPapersOpen,
        command.isTicketSalesOpen
      ),
    });
  }

  static random() {
    return Conference.create({
      id: ConferenceId.fromString(faker.datatype.uuid()),
      ownerId: UserId.fromString(faker.datatype.uuid()),
      name: ConferenceName.fromString(faker.random.word()),
      slug: ConferenceSlug.fromString(faker.random.word()),
      place: ConferencePlace.fromString(faker.random.word()),
      dateRange: ConferenceDateRange.fromStartAndEndDate(faker.date.soon(), faker.date.future()),
      settings: ConferenceSettings.fromValues(
        faker.datatype.boolean(),
        faker.datatype.boolean(),
        faker.datatype.boolean()
      ),
    });
  }

  static forId(id: ConferenceId) {
    return Conference.create({
      id,
      ownerId: UserId.fromString(faker.datatype.uuid()),
      name: ConferenceName.fromString(faker.random.word()),
      slug: ConferenceSlug.fromString(faker.random.word()),
      place: ConferencePlace.fromString(faker.random.word()),
      dateRange: ConferenceDateRange.fromStartAndEndDate(faker.date.soon(), faker.date.future()),
      settings: ConferenceSettings.fromValues(
        faker.datatype.boolean(),
        faker.datatype.boolean(),
        faker.datatype.boolean()
      ),
    });
  }
}

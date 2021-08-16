import * as faker from 'faker';

import { CreateConferenceCommand } from '../../../../src/conference/application';
import {
  Conference,
  ConferenceDateRange,
  ConferenceId,
  ConferenceName,
  ConferencePlace,
  ConferenceSettings,
  ConferenceSlug,
} from '../../../../src/conference/domain';

export class ConferenceMother {
  static fromCommand(command: CreateConferenceCommand) {
    return Conference.create({
      id: ConferenceId.fromString(command.id),
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

import { CreateConferenceCommand } from '../../../src/conference/application';
import { Conference } from '../../../src/conference/domain/model/conference';
import { ConferenceDateRange } from '../../../src/conference/domain/model/conference-date-range';
import { ConferenceId } from '../../../src/conference/domain/model/conference-id';
import { ConferenceName } from '../../../src/conference/domain/model/conference-name';
import { ConferencePlace } from '../../../src/conference/domain/model/conference-place';
import { ConferenceUrl } from '../../../src/conference/domain/model/conference-url';

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
}

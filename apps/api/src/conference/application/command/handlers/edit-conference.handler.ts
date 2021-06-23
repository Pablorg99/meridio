import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ConferenceDateRange,
  ConferenceId,
  ConferenceName,
  ConferenceNotFound,
  ConferencePlace,
  ConferenceRepository,
  conferenceRepository,
  ConferenceUrl,
} from '../../../domain';
import { EditConferenceCommand } from '../edit-conference.command';
import { CreateConferenceCommand } from '../index';

@CommandHandler(EditConferenceCommand)
export class EditConferenceHandler implements ICommandHandler<CreateConferenceCommand> {
  constructor(@Inject(conferenceRepository) private repository: ConferenceRepository) {}

  async execute(command: EditConferenceCommand) {
    const conferenceId = ConferenceId.fromString(command.id);
    const conference = await this.repository.find(conferenceId);

    if (!conference) {
      throw new ConferenceNotFound(command.id);
    }

    const name = ConferenceName.fromString(command.name);
    const url = ConferenceUrl.fromString(command.url);
    const place = ConferencePlace.fromString(command.place);
    const dateRange = ConferenceDateRange.fromStartAndEndDate(command.startDate, command.endDate);
    conference.update({ name, url, place, dateRange });

    await this.repository.save(conference);
  }
}
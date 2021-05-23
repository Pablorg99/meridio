import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Conference,
  ConferenceDateRange,
  ConferenceId,
  ConferenceName,
  ConferencePlace,
  ConferenceUrl,
} from '../../domain/model';
import { ConferenceRepository, conferenceRepository } from '../../domain/repository';
import { CreateConferenceCommand } from './create-conference.command';

@CommandHandler(CreateConferenceCommand)
export class CreateConferenceHandler implements ICommandHandler<CreateConferenceCommand> {
  constructor(@Inject(conferenceRepository) private repository: ConferenceRepository) {}

  async execute(command: CreateConferenceCommand) {
    const conference = Conference.create({
      id: ConferenceId.fromString(command.id),
      name: ConferenceName.fromString(command.name),
      url: ConferenceUrl.fromString(command.url),
      place: ConferencePlace.fromString(command.place),
      dateRange: ConferenceDateRange.fromStartAndEndDate(command.startDate, command.endDate),
    });

    this.repository.save(conference);
  }
}

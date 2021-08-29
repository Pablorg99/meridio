import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  AlreadyExistingConferenceSlugError,
  Conference,
  ConferenceDateRange,
  ConferenceId,
  ConferenceName,
  ConferencePlace,
  ConferenceRepository,
  conferenceRepository,
  ConferenceSettings,
  ConferenceSlug,
  ConferencesProjection,
  conferencesProjection,
} from '../../../domain';
import { CreateConferenceCommand } from '../create-conference.command';

@CommandHandler(CreateConferenceCommand)
export class CreateConferenceHandler implements ICommandHandler<CreateConferenceCommand> {
  constructor(
    @Inject(conferenceRepository) private repository: ConferenceRepository,
    @Inject(conferencesProjection) private projection: ConferencesProjection
  ) {}

  async execute(command: CreateConferenceCommand) {
    if (await this.projection.findBySlug(command.slug)) {
      throw new AlreadyExistingConferenceSlugError(command.slug);
    }

    const conference = Conference.create({
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

    await this.repository.save(conference);
  }
}

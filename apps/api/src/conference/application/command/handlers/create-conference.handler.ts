import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ConferenceId, UserId } from '../../../../shared/domain';
import {
  AlreadyExistingConferenceSlugError,
  Conference,
  ConferenceDateRange,
  ConferenceName,
  ConferencePlace,
  ConferenceRepository,
  conferenceRepository,
  ConferenceSettings,
  ConferenceSlug,
  ConferencesProjection,
  conferencesProjection,
  Criteria,
} from '../../../domain';
import { CreateConferenceCommand } from '../create-conference.command';

@CommandHandler(CreateConferenceCommand)
export class CreateConferenceHandler implements ICommandHandler<CreateConferenceCommand> {
  constructor(
    @Inject(conferenceRepository) private repository: ConferenceRepository,
    @Inject(conferencesProjection) private projection: ConferencesProjection
  ) {}

  async execute(command: CreateConferenceCommand) {
    const slug = ConferenceSlug.fromString(command.slug);
    if (await this.projection.exists(new Criteria({ slug }))) {
      throw new AlreadyExistingConferenceSlugError(command.slug);
    }

    const conference = Conference.create({
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

    await this.repository.save(conference);
  }
}

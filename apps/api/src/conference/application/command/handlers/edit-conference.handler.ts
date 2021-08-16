import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  ConferenceDateRange,
  ConferenceId,
  ConferenceIdNotFound,
  ConferenceName,
  ConferencePlace,
  ConferenceRepository,
  conferenceRepository,
  ConferenceSettings,
  ConferenceSlug,
} from '../../../domain';
import { EditConferenceCommand } from '../edit-conference.command';

@CommandHandler(EditConferenceCommand)
export class EditConferenceHandler implements ICommandHandler<EditConferenceCommand> {
  constructor(@Inject(conferenceRepository) private repository: ConferenceRepository) {}

  async execute(command: EditConferenceCommand) {
    const conferenceId = ConferenceId.fromString(command.id);
    const conference = await this.repository.find(conferenceId);

    if (!conference) {
      throw new ConferenceIdNotFound(command.id);
    }

    const name = ConferenceName.fromString(command.name);
    const slug = ConferenceSlug.fromString(command.slug);
    const place = ConferencePlace.fromString(command.place);
    const dateRange = ConferenceDateRange.fromStartAndEndDate(command.startDate, command.endDate);
    const settings = ConferenceSettings.fromValues(
      command.isLandingPageOpen,
      command.isCallForPapersOpen,
      command.isTicketSalesOpen
    );
    conference.update({ name, slug, place, dateRange, settings });

    await this.repository.save(conference);
  }
}

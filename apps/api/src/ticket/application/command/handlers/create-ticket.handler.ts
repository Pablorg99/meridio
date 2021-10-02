import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { ConferenceId, UserId, UserInfo } from '../../../../shared/domain';
import { Ticket, TicketId, TicketRepository, ticketRepository } from '../../../domain';
import { CreateTicketCommand } from '../create-ticket.command';

@CommandHandler(CreateTicketCommand)
export class CreateTicketHandler {
  constructor(@Inject(ticketRepository) private repository: TicketRepository) {}

  async execute(command: CreateTicketCommand) {
    const ticket = Ticket.create({
      id: TicketId.fromString(command.id),
      buyerId: UserId.fromString(command.buyerId),
      conferenceId: ConferenceId.fromString(command.conferenceId),
      assistantInfo: UserInfo.fromDTO(command.assistantInfo),
    });

    await this.repository.save(ticket);
  }
}

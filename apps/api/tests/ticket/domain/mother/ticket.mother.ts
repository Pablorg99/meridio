import { ConferenceId, UserId, UserInfo } from '../../../../src/shared/domain';
import { CreateTicketCommand } from '../../../../src/ticket/application';
import { Ticket, TicketId } from '../../../../src/ticket/domain';

export class TicketMother {
  static fromCommand(command: CreateTicketCommand) {
    return Ticket.create({
      id: TicketId.fromString(command.id),
      buyerId: UserId.fromString(command.buyerId),
      conferenceId: ConferenceId.fromString(command.conferenceId),
      assistantInfo: UserInfo.fromDTO(command.assistantInfo),
    });
  }
}

import { UserInfoDTO } from '@meridio/contracts';
import { ICommand } from '@nestjs/cqrs';

export class CreateTicketCommand implements ICommand {
  readonly id: string;
  readonly buyerId: string;
  readonly conferenceId: string;
  readonly assistantInfo: UserInfoDTO;

  constructor(params: { id: string; buyerId: string; conferenceId: string; assistantInfo: UserInfoDTO }) {
    this.id = params.id;
    this.buyerId = params.buyerId;
    this.conferenceId = params.conferenceId;
    this.assistantInfo = params.assistantInfo;
  }
}

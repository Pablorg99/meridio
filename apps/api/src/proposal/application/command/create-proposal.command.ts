import { UserInfoDTO } from '@meridio/contracts';
import { ICommand } from '@nestjs/cqrs';

export class CreateProposalCommand implements ICommand {
  readonly id: string;
  readonly ownerId: string;
  readonly conferenceId: string;
  readonly title: string;
  readonly description: string;
  readonly speakerInfo: UserInfoDTO;

  constructor(params: {
    id: string;
    ownerId: string;
    conferenceId: string;
    title: string;
    description: string;
    speakerInfo: UserInfoDTO;
  }) {
    this.id = params.id;
    this.ownerId = params.ownerId;
    this.conferenceId = params.conferenceId;
    this.title = params.title;
    this.description = params.description;
    this.speakerInfo = params.speakerInfo;
  }
}

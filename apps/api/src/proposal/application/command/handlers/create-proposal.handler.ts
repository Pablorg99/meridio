import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { ConferenceId, UserId, UserInfo } from '../../../../shared/domain';
import {
  Proposal,
  ProposalDescription,
  ProposalId,
  ProposalRepository,
  proposalRepository,
  ProposalTitle,
} from '../../../domain';
import { CreateProposalCommand } from '../create-proposal.command';

@CommandHandler(CreateProposalCommand)
export class CreateProposalHandler {
  constructor(@Inject(proposalRepository) private repository: ProposalRepository) {}

  async execute(command: CreateProposalCommand) {
    const proposal = Proposal.create({
      id: ProposalId.fromString(command.id),
      ownerId: UserId.fromString(command.ownerId),
      conferenceId: ConferenceId.fromString(command.conferenceId),
      title: ProposalTitle.fromString(command.title),
      description: ProposalDescription.fromString(command.description),
      speakerInfo: UserInfo.fromDTO(command.speakerInfo),
    });

    await this.repository.save(proposal);
  }
}

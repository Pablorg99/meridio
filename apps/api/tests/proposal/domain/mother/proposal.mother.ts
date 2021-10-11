import { CreateProposalCommand } from '../../../../src/proposal/application';
import { Proposal, ProposalDescription, ProposalId, ProposalTitle } from '../../../../src/proposal/domain';
import { ConferenceId, UserId, UserInfo } from '../../../../src/shared/domain';

export class ProposalMother {
  static fromCommand(command: CreateProposalCommand) {
    return Proposal.create({
      id: ProposalId.fromString(command.id),
      ownerId: UserId.fromString(command.ownerId),
      conferenceId: ConferenceId.fromString(command.conferenceId),
      title: ProposalTitle.fromString(command.title),
      description: ProposalDescription.fromString(command.description),
      speakerInfo: UserInfo.fromDTO(command.speakerInfo),
    });
  }
}

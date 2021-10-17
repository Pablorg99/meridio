import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';

import { ProposalsProjection, proposalsProjection, ProposalWasCreated } from '../../domain';

@ViewUpdaterHandler(ProposalWasCreated)
export class UpdateProposalsProjectionOnProposalWasCreated implements IViewUpdater<ProposalWasCreated> {
  constructor(@Inject(proposalsProjection) private proposals: ProposalsProjection) {}

  async handle(event: ProposalWasCreated) {
    await this.proposals.save({
      id: event.id,
      ownerId: event.ownerId,
      conferenceId: event.conferenceId,
      title: event.title,
      description: event.description,
      speakerInfo: event.speakerInfo,
    });
  }
}

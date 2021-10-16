import { ProposalDTO } from '@meridio/contracts';

import { UpdateProposalsProjectionOnProposalWasCreated } from '../../../src/proposal/infrastructure';
import { ProposalWasCreatedMother } from '../domain/mother/proposal-was-created.mother';
import { ProposalsMockProjection } from '../mock/proposals-projection.mock';

describe('UpdateProposalsProjectionOnProposalWasCreated', function () {
  it('should store a proposal dto in the projection from event data', function () {
    const event = ProposalWasCreatedMother.random();
    const proposals = new ProposalsMockProjection();
    const subscriber = new UpdateProposalsProjectionOnProposalWasCreated(proposals);

    subscriber.handle(event);

    const expectedDto: ProposalDTO = {
      id: event.id,
      ownerId: event.ownerId,
      title: event.title,
      description: event.description,
      conferenceId: event.conferenceId,
      speakerInfo: event.speakerInfo,
    };

    expect(proposals.saveSpy).toHaveBeenCalledWith(expectedDto);
  });
});

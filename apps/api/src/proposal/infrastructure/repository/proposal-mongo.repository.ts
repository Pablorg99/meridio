import { Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';

import { Proposal, ProposalRepository } from '../../domain';

@Injectable()
export class ProposalMongoRepository implements ProposalRepository {
  constructor(private readonly publisher: StoreEventPublisher) {}

  async save(proposal: Proposal): Promise<void> {
    proposal = this.publisher.mergeObjectContext(proposal);
    proposal.commit();
  }
}

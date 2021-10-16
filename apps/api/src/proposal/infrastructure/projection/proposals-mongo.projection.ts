import { ProposalDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { ProposalsProjection } from '../../domain';
import { ProposalDocument } from './proposal.document';
import { ProposalSchema } from './proposal.schema';

export class ProposalsMongoProjection implements ProposalsProjection {
  private model: Model<ProposalDocument>;

  constructor(@Inject(mongoConnection) connection: Connection) {
    this.model = connection.model<ProposalDocument>('proposals', ProposalSchema);
  }

  async save(proposal: ProposalDTO): Promise<void> {
    await this.model.create({
      _id: proposal.id,
      ...proposal,
    });
  }
}

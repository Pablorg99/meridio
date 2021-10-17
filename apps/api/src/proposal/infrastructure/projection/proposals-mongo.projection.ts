import { ProposalDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { ProposalsProjection } from '../../domain';
import { ProposalMapper } from '../mapper';
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

  async find(conferenceId: string): Promise<Array<ProposalDTO>> {
    const proposalDocuments = await this.model.find({ conferenceId });

    return ProposalMapper.documentToDTO(proposalDocuments);
  }
}

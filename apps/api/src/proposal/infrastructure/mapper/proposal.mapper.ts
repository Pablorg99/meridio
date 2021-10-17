import { ProposalDTO } from '@meridio/contracts';

import { ProposalDocument } from '../projection';

export class ProposalMapper {
  static documentToDTO(documents: Array<ProposalDocument>): Array<ProposalDTO> {
    return documents.map((document) => ({
      id: document._id,
      ownerId: document.ownerId,
      conferenceId: document.conferenceId,
      title: document.title,
      description: document.description,
      speakerInfo: document.speakerInfo,
    }));
  }
}

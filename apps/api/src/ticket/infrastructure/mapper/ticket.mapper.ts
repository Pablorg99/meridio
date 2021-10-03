import { TicketDTO } from '@meridio/contracts';

import { TicketDocument } from '../projection';

export class TicketMapper {
  static documentToDTO(documents: Array<TicketDocument>): Array<TicketDTO> {
    return documents.map((document) => ({ id: document._id, ...document }));
  }
}

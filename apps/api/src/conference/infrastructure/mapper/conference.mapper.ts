import { ConferenceDTO } from '@meridio/contracts';

import { ConferenceDocument } from '../projection';

export class ConferenceMapper {
  static documentsToDTO(documents: Array<ConferenceDocument>): Array<ConferenceDTO> {
    return documents.map((document) => ({
      id: document._id,
      ownerId: document.ownerId,
      name: document.name,
      slug: document.slug,
      place: document.place,
      startDate: document.startDate,
      endDate: document.endDate,
      logoSource: document.logoSource,
      isLandingPageOpen: document.isLandingPageOpen,
      isCallForPapersOpen: document.isCallForPapersOpen,
      isTicketSalesOpen: document.isTicketSalesOpen,
    }));
  }
}

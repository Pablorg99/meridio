import { ConferenceDocument } from '../projection';

export class ConferenceMapper {
  static documentToDTO(projection: ConferenceDocument) {
    const { name, slug, place, logoSource, isLandingPageOpen, isCallForPapersOpen, isTicketSalesOpen } = projection;
    const id = projection.id as string;
    const startDate = projection.startDate;
    const endDate = projection.endDate;
    return {
      id,
      name,
      slug,
      place,
      startDate,
      endDate,
      logoSource,
      isLandingPageOpen,
      isCallForPapersOpen,
      isTicketSalesOpen,
    };
  }
}

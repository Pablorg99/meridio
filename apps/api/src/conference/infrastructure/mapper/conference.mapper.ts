import { ConferenceDocument } from '../projection';

export class ConferenceMapper {
  static documentToDTO(projection: ConferenceDocument) {
    const { name, url, place, logoSource } = projection;
    const id = projection.id as string;
    const startDate = projection.startDate;
    const endDate = projection.endDate;
    return { id, name, url, place, startDate, endDate, logoSource };
  }
}

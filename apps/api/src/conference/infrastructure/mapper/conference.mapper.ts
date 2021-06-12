import { ConferenceDocument } from '../projection';

export class ConferenceMapper {
  static documentToDTO(projection: ConferenceDocument) {
    const { name, url, place, logoSource } = projection;
    const id = projection.id as string;
    const startDate = projection.startDate.toISOString().split('T')[0];
    const endDate = projection.endDate.toISOString().split('T')[0];
    return { id, name, url, place, startDate, endDate, logoSource };
  }
}

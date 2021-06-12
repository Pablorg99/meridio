import { ConferenceDTO } from '@meridio/contracts';

export interface ConferencesProjection {
  save(conference: ConferenceDTO): Promise<void>;
  find(id: string): Promise<ConferenceDTO | null>
}

export const conferencesProjection = 'conferencesProjection'

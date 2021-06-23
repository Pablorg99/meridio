import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';

export interface ConferencesProjection {
  save(conference: ConferenceDTO): Promise<void>;
  find(id: string): Promise<Nullable<ConferenceDTO>>;
}

export const conferencesProjection = 'conferencesProjection';

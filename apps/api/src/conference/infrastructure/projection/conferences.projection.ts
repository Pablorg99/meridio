import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';

export interface ConferencesProjection {
  save(conference: ConferenceDTO): Promise<void>;

  update(conference: ConferenceDTO): Promise<void>;

  exists(id: string): Promise<boolean>;

  find(id: string): Promise<Nullable<ConferenceDTO>>;

  findByUrl(url: string): Promise<Nullable<ConferenceDTO>>;
}

export const conferencesProjection = 'conferencesProjection';

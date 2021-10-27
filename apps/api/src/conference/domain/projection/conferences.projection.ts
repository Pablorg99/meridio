import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';

import { Criteria } from './conferences.criteria';

export interface ConferencesProjection {
  save(conference: ConferenceDTO): Promise<void>;

  update(conference: ConferenceDTO): Promise<void>;

  exists(criteria: Criteria): Promise<boolean>;

  find(criteria: Criteria): Promise<Array<ConferenceDTO>>;
}

export const conferencesProjection = 'conferencesProjection';

import { Nullable } from '@meridio/domain';

import { ConferenceId } from '../../../shared/domain';
import { Conference } from '../model';

export interface ConferenceRepository {
  save(conference: Conference): Promise<void>;

  find(id: ConferenceId): Promise<Nullable<Conference>>;
}

export const conferenceRepository = 'conferenceRepository';

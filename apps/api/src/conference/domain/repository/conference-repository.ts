import { Nullable } from '@meridio/domain';

import { Conference, ConferenceId } from '../model';

export interface ConferenceRepository {
  save(conference: Conference): Promise<void>;

  find(id: ConferenceId): Promise<Nullable<Conference>>;
}

export const conferenceRepository = 'conferenceRepository';

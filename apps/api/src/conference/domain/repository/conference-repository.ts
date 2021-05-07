import { Conference } from '../model/conference';

export interface ConferenceRepository {
  save(conference: Conference): Promise<void>;
}

import { conferenceRepository, conferencesProjection } from '../domain';
import { ConferencesMongoProjection } from './projection';
import { ConferenceMongoRepository } from './repository';

export const conferenceProviders = [
  { provide: conferenceRepository, useClass: ConferenceMongoRepository },
  { provide: conferencesProjection, useClass: ConferencesMongoProjection },
];

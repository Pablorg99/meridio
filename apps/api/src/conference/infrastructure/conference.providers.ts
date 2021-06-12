import { conferenceRepository } from '../domain';
import { ConferencesMongoProjection } from './projection';
import { conferencesProjection } from './projection/conferences.projection';
import { ConferenceMongoRepository } from './repository';

export const conferenceProviders = [
  {
    provide: conferenceRepository,
    useClass: ConferenceMongoRepository,
  },
  { provide: conferencesProjection, useClass: ConferencesMongoProjection },
];

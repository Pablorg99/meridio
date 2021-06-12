import { conferenceRepository } from '../domain';
import { ConferencesMongoProjection, conferencesProjection } from './read-model';
import { ConferenceMongoRepository } from './repository';

export const conferenceProviders = [
  {
    provide: conferenceRepository,
    useClass: ConferenceMongoRepository,
  },
  { provide: conferencesProjection, useClass: ConferencesMongoProjection },
];

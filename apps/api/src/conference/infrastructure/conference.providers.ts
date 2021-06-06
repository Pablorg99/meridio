import { Connection } from 'mongoose';

import { mongoConnection } from '../../database/database.provider';
import { conferenceRepository } from '../domain';
import { conferenceProjection, ConferenceSchema } from './read-model/conference.projection';
import { ConferenceMongoRepository } from './repository';

export const conferenceProviders = [
  { provide: conferenceRepository, useClass: ConferenceMongoRepository },
  {
    provide: conferenceProjection,
    useFactory: (connection: Connection) => connection.model('Conference', ConferenceSchema),
    inject: [mongoConnection]
  },
];

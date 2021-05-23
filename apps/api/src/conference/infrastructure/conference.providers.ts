import { conferenceRepository } from '../domain';
import { ConferenceMongoRepository } from './repository';

export const conferenceProviders = [{ provide: conferenceRepository, useClass: ConferenceMongoRepository }];

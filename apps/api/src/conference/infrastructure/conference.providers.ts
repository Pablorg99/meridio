import { conferenceRepository } from '../domain';
import { ConferenceInMemoryRepository } from './repository';

export const conferenceProviders = [{ provide: conferenceRepository, useClass: ConferenceInMemoryRepository }];

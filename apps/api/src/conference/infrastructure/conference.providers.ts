import { conferenceRepository } from '../domain';
import { ConferenceEventStoreRepository } from './repository/conference-event-store-repository';

export const conferenceProviders = [{ provide: conferenceRepository, useClass: ConferenceEventStoreRepository }];

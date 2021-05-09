import { Conference, ConferenceRepository } from '../../domain';

export class ConferenceInMemoryRepository implements ConferenceRepository {
  async save(conference: Conference): Promise<void> {}
}

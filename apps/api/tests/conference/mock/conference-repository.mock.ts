import { Nullable } from '@meridio/domain';

import { Conference, ConferenceRepository } from '../../../src/conference/domain';
import { ConferenceId } from '../../../src/shared/domain';
import { ConferenceMother } from '../domain/mother/conference.mother';

export class ConferenceMockRepository implements ConferenceRepository {
  readonly mockSave = jest.fn();
  readonly onGet: Nullable<Conference>;

  constructor(params?: { onGet?: Nullable<Conference> }) {
    this.onGet = params?.onGet || null;
  }

  async save(conference: Conference): Promise<void> {
    this.mockSave(conference);
  }

  async find(id: ConferenceId): Promise<Conference> {
    return this.onGet || ConferenceMother.forId(id);
  }
}

import { Conference } from '../../../src/conference/domain/model/conference';
import { ConferenceRepository } from '../../../src/conference/domain/repository/conference-repository';

export class ConferenceMockRepository implements ConferenceRepository {
  readonly mockSave = jest.fn();

  async save(conference: Conference): Promise<void> {
    this.mockSave(conference);
  }
}

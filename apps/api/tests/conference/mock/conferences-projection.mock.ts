// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ConferenceDTO, CreateConferenceDTOMother } from '@meridio/contracts';

import { ConferencesProjection } from '../../../src/conference/infrastructure';

export class ConferencesMockProjection implements ConferencesProjection {
  readonly saveSpy = jest.fn();
  readonly findSpy = jest.fn();
  private readonly onFind: ConferenceDTO | null;

  constructor(params?: { onFind?: ConferenceDTO | null }) {
    this.onFind = params?.onFind || null;
  }

  async save(conference: ConferenceDTO) {
    this.saveSpy(conference);
  }

  async find(id: string): Promise<ConferenceDTO | null> {
    this.findSpy(id);
    return this.onFind
  }
}

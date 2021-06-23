import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';

import { ConferencesProjection } from '../../../src/conference/infrastructure/projection/conferences.projection';

export class ConferencesMockProjection implements ConferencesProjection {
  readonly saveSpy = jest.fn();
  readonly findSpy = jest.fn();
  private readonly onFind: Nullable<ConferenceDTO>;

  constructor(params?: { onFind?: Nullable<ConferenceDTO> }) {
    this.onFind = params?.onFind || null;
  }

  async save(conference: ConferenceDTO) {
    this.saveSpy(conference);
  }

  async find(id: string): Promise<Nullable<ConferenceDTO>> {
    this.findSpy(id);
    return this.onFind;
  }
}

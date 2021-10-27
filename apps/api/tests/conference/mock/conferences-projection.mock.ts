/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';

import { ConferencesProjection, Criteria } from '../../../src/conference/domain';

export class ConferencesMockProjection implements ConferencesProjection {
  readonly saveSpy = jest.fn();
  readonly updateSpy = jest.fn();
  private readonly onExists: boolean;
  private readonly onFind: Array<ConferenceDTO>;

  constructor(params?: { onFind?: Array<ConferenceDTO>; onExists?: boolean }) {
    this.onFind = params?.onFind || [];
    this.onExists = params?.onExists || false;
  }

  async save(conference: ConferenceDTO) {
    this.saveSpy(conference);
  }

  async update(conference: ConferenceDTO) {
    this.updateSpy(conference);
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.onExists;
  }

  async find(criteria: Criteria): Promise<Array<ConferenceDTO>> {
    return this.onFind;
  }
}

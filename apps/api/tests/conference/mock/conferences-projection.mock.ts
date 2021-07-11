/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';

import { ConferencesProjection } from '../../../src/conference/infrastructure/projection/conferences.projection';

export class ConferencesMockProjection implements ConferencesProjection {
  readonly saveSpy = jest.fn();
  readonly updateSpy = jest.fn();
  private readonly onExists: boolean;
  private readonly onFind: Nullable<ConferenceDTO>;

  constructor(params?: { onFind?: Nullable<ConferenceDTO>; onExists?: boolean }) {
    this.onFind = params?.onFind || null;
    this.onExists = params?.onExists || false;
  }

  async save(conference: ConferenceDTO) {
    this.saveSpy(conference);
  }

  async update(conference: ConferenceDTO) {
    this.updateSpy(conference);
  }

  async exists(id: string): Promise<boolean> {
    return this.onExists;
  }

  async find(id: string): Promise<Nullable<ConferenceDTO>> {
    return this.onFind;
  }

  async findByUrl(url: string): Promise<Nullable<ConferenceDTO>> {
    return this.onFind;
  }
}

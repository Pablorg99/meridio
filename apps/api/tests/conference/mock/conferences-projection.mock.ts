import { ConferenceDTO} from '@meridio/contracts';

import { ConferencesProjection } from '../../../src/conference/infrastructure/projection/conferences.projection';


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

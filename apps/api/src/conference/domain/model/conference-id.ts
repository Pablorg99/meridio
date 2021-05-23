import { Id } from '@meridio/domain';

export class ConferenceId extends Id {
  public static fromString(id: string) {
    return new ConferenceId(id);
  }
}

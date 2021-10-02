import { Id } from '@meridio/domain';

export class TicketId extends Id {
  public static fromString(id: string) {
    return new TicketId(id);
  }
}

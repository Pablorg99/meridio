import { Id } from '@meridio/domain';

export class ProposalId extends Id {
  public static fromString(id: string) {
    return new ProposalId(id);
  }
}

import { ValueObject } from '@meridio/domain';

import { ProposalTitle } from './proposal-title';

export class ProposalDescription extends ValueObject<{ value: string }> {
  public static fromString(description: string) {
    if (description.length === 0) {
      throw new Error('Proposal description cannot be empty');
    }

    return new ProposalTitle({ value: description });
  }

  get value() {
    return this.props.value;
  }
}

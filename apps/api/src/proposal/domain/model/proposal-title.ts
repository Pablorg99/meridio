import { ValueObject } from '@meridio/domain';

export class ProposalTitle extends ValueObject<{ value: string }> {
  public static fromString(title: string) {
    if (title.length === 0) {
      throw new Error('Proposal title cannot be empty');
    }

    return new ProposalTitle({ value: title });
  }

  get value() {
    return this.props.value;
  }
}

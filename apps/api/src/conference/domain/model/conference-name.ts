import { ValueObject } from '@meridio/domain';

export class ConferenceName extends ValueObject<{ value: string }> {
  public static fromString(name: string) {
    if (name.length === 0) {
      throw new Error('Conference name cannot be empty');
    }

    return new ConferenceName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

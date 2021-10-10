import { ValueObject } from '@meridio/domain';

export class FullName extends ValueObject<{ value: string }> {
  public static fromString(fullName: string) {
    if (fullName.length === 0) {
      throw new Error('Full name cannot be empty');
    }

    return new FullName({ value: fullName });
  }

  get value() {
    return this.props.value;
  }
}

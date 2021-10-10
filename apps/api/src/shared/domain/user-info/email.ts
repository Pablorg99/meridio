import { ValueObject } from '@meridio/domain';

export class Email extends ValueObject<{ value: string }> {
  public static fromString(email: string) {
    if (email.length === 0) {
      throw new Error('Email cannot be empty');
    }

    return new Email({ value: email });
  }

  get value() {
    return this.props.value;
  }
}

import { ValueObject } from '@meridio/domain';

export class UserFullName extends ValueObject<{ value: string }> {
  public static fromString(name: string) {
    if (name.length === 0) {
      throw new Error('User full name cannot be empty');
    }

    return new UserFullName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}

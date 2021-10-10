import { ValueObject } from '@meridio/domain';

export class Gender extends ValueObject<{ value: string }> {
  public static fromString(gender: string) {
    if (gender.length === 0) {
      throw new Error('Gender cannot be empty');
    }

    return new Gender({ value: gender });
  }

  get value() {
    return this.props.value;
  }
}

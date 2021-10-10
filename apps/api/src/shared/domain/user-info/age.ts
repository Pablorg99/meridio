import { ValueObject } from '@meridio/domain';

export class Age extends ValueObject<{ value: number }> {
  public static fromNumber(age: number) {
    if (age <= 0) {
      throw new Error('Age cannot be negative');
    }

    return new Age({ value: age });
  }

  get value() {
    return this.props.value;
  }
}

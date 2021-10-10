import { ValueObject } from '@meridio/domain';

export class Country extends ValueObject<{ value: string }> {
  public static fromString(country: string) {
    if (country.length === 0) {
      throw new Error('Country cannot be empty');
    }

    return new Country({ value: country });
  }

  get value() {
    return this.props.value;
  }
}

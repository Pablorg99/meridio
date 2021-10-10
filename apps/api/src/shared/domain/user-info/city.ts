import { ValueObject } from '@meridio/domain';

export class City extends ValueObject<{ value: string }> {
  public static fromString(city: string) {
    if (city.length === 0) {
      throw new Error('City cannot be empty');
    }

    return new City({ value: city });
  }

  get value() {
    return this.props.value;
  }
}

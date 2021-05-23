import { ValueObject } from '@meridio/domain';

export class ConferencePlace extends ValueObject<{ value: string }> {
  public static fromString(place: string) {
    if (place.length === 0) {
      throw new Error('Conference place cannot be empty');
    }

    return new ConferencePlace({ value: place });
  }

  get value(): string {
    return this.props.value;
  }
}

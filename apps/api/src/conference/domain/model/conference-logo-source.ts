import { ValueObject } from '@meridio/domain';

export class ConferenceLogoSource extends ValueObject<{ value: string }> {
  public static fromString(source: string) {
    if (source.length === 0) {
      throw new Error('Conference logo source cannot be empty');
    }

    return new ConferenceLogoSource({ value: source });
  }

  get value(): string {
    return this.props.value;
  }
}

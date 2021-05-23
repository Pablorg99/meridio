import { ValueObject } from '@meridio/domain';

export class ConferenceUrl extends ValueObject<{ value: string }> {
  public static fromString(url: string) {
    if (url.length === 0) {
      throw new Error('Conference url cannot be empty');
    }

    if (!/^[http|https://a-z0-9.]+\/[a-z0-9]+$/g.test(url)) {
      throw new Error('Invalid conference url');
    }

    return new ConferenceUrl({ value: url });
  }

  get value(): string {
    return this.props.value;
  }
}

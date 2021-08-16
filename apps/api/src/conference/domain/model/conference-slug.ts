import { ValueObject } from '@meridio/domain';

export class ConferenceSlug extends ValueObject<{ value: string }> {
  public static fromString(slug: string) {
    if (slug.length === 0) {
      throw new Error('Conference slug cannot be empty');
    }

    if (!/^[^/]+$/g.test(slug)) {
      throw new Error('Conference slug can not contain "/" char');
    }

    return new ConferenceSlug({ value: slug });
  }

  get value(): string {
    return this.props.value;
  }
}

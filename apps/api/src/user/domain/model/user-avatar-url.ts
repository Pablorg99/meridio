import { ValueObject } from '@meridio/domain';

export class UserAvatarUrl extends ValueObject<{ value: string }> {
  public static fromUrl(url: string) {
    if (url.length === 0) {
      throw new Error('User avatar url cannot be empty');
    }

    return new UserAvatarUrl({ value: url });
  }

  get value(): string {
    return this.props.value;
  }
}

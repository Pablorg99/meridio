import { Nullable } from '@meridio/domain';

export interface JwtPayloadInterface {
  name: string;
  email: Nullable<string>;
  picture: string;
  sub: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isJwtPayload(arg: any): arg is JwtPayloadInterface {
  return arg && arg.username && arg.roles;
}

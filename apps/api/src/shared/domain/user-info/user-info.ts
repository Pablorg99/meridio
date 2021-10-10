import { UserInfoDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';

import { Age } from './age';
import { City } from './city';
import { Country } from './country';
import { Email } from './email';
import { FullName } from './full-name';
import { Gender } from './gender';

export class UserInfo {
  readonly fullName: FullName;
  readonly email: Email;
  readonly age: Nullable<Age>;
  readonly country: Nullable<Country>;
  readonly city: Nullable<City>;
  readonly gender: Nullable<Gender>;

  private constructor(params: {
    fullName: FullName;
    email: Email;
    age?: Age;
    city?: City;
    country?: Country;
    gender?: Gender;
  }) {
    this.fullName = params.fullName;
    this.email = params.email;
    this.age = params.age || null;
    this.country = params.country || null;
    this.city = params.city || null;
    this.gender = params.gender || null;
  }

  static fromDTO(userInfo: UserInfoDTO) {
    return new UserInfo({
      fullName: FullName.fromString(userInfo.fullName),
      email: Email.fromString(userInfo.email),
      age: userInfo.age ? Age.fromNumber(userInfo.age) : undefined,
      country: userInfo.country ? Country.fromString(userInfo.country) : undefined,
      city: userInfo.city ? City.fromString(userInfo.city) : undefined,
      gender: userInfo.gender ? Gender.fromString(userInfo.gender) : undefined,
    });
  }
}

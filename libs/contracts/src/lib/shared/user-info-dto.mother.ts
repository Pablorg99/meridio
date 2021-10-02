import * as faker from 'faker';

import { UserInfoDTO } from './index';

export class UserInfoDTOMother {
  static random(): UserInfoDTO {
    return {
      fullName: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.datatype.number(80),
      country: faker.address.country(),
      city: faker.address.city(),
      gender: faker.random.arrayElements(['male', 'female'])[0],
    };
  }
}

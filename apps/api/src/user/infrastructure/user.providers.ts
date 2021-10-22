import { Provider } from '@nestjs/common';

import { userRepository } from '../domain';
import { UserMongoRepository } from './repository/user.repository';

export const userProviders: Provider[] = [
  {
    provide: userRepository,
    useClass: UserMongoRepository,
  },
];

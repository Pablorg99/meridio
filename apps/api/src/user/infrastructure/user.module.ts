import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import {
  CreateUserHandler,
  DeleteUserHandler,
  GetUserHandler,
  GetUsersHandler,
  UpdateUserHandler,
} from '../application';
import { UserWasDeletedSaga } from './saga/user-was-deleted.saga';
import { userProviders } from './user.providers';

const CommandHandlers = [CreateUserHandler, DeleteUserHandler];
const QueryHandlers = [GetUserHandler, GetUsersHandler, UpdateUserHandler];
const Sagas = [UserWasDeletedSaga];

@Module({
  imports: [AuthModule, CqrsModule, DatabaseModule],
  providers: [...userProviders, ...CommandHandlers, ...QueryHandlers, ...Sagas],
})
export class UserModule {}

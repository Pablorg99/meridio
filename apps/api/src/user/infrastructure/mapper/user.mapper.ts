import { UserDTO } from '@meridio/contracts';

import { UserId } from '../../../shared/domain';
import { Role, User, UserAvatarUrl, UserFullName } from '../../domain';
import { UserDocument } from '../repository/user.document';

export class UserMapper {
  static documentToDTO(document: UserDocument): UserDTO {
    const { _id, fullName, avatarUrl, roles } = document;
    return {
      id: _id,
      fullName,
      avatarUrl,
      roles,
    };
  }

  static documentToAggregate(document: UserDocument) {
    const { _id, fullName, avatarUrl, roles } = document;

    const user: User = Reflect.construct(User, []);
    Reflect.set(user, '_id', UserId.fromString(_id));
    Reflect.set(user, '_fullName', UserFullName.fromString(fullName));
    Reflect.set(user, '_avatarUrl', UserAvatarUrl.fromUrl(avatarUrl));
    Reflect.set(
      user,
      '_roles',
      roles.map((role: string) => Role.fromString(role))
    );

    return user;
  }

  static aggregateToDocument(user: User) {
    return {
      _id: user.id.value,
      fullName: user.fullName.value,
      avatarUrl: user.avatarUrl.value,
      roles: user.roles.map((role) => role.value),
    } as UserDocument;
  }
}

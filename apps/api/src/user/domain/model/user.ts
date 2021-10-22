import { Nullable } from '@meridio/domain';
import { AggregateRoot } from '@nestjs/cqrs';

import { UserId } from '../../../shared/domain';
import { UserRoleWasAdded, UserRoleWasRemoved, UserWasCreated } from '../event';
import { UserWasDeleted } from '../event/user-was-deleted.event';
import { Role } from './role';
import { UserAvatarUrl } from './user-avatar-url';
import { UserFullName } from './user-full-name';

export class User extends AggregateRoot {
  private _id: UserId;
  private _fullName: UserFullName;
  private _avatarUrl: UserAvatarUrl;
  private _roles: Role[];
  private _deleted: Nullable<Date>;

  private constructor() {
    super();
  }

  public static add(params: { id: UserId; fullName: UserFullName; avatarUrl: UserAvatarUrl }): User {
    const user = new User();
    const event = new UserWasCreated({
      id: params.id.value,
      fullName: params.fullName.value,
      avatarUrl: params.avatarUrl.value,
    });

    user.apply(event);

    return user;
  }

  get id(): UserId {
    return this._id;
  }

  get fullName(): UserFullName {
    return this._fullName;
  }

  get avatarUrl(): UserAvatarUrl {
    return this._avatarUrl;
  }

  get roles(): Role[] {
    return Array.from(this._roles);
  }

  hasRole(role: Role): boolean {
    return this._roles.some((item: Role) => item.equals(role));
  }

  addRole(role: Role): void {
    if (this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasAdded(this.id.value, role.value));
  }

  removeRole(role: Role): void {
    if (!this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasRemoved(this.id.value, role.value));
  }

  delete(): void {
    if (this._deleted) {
      return;
    }

    this.apply(new UserWasDeleted(this.id.value));
  }

  private onUserWasCreated(event: UserWasCreated) {
    this._id = UserId.fromString(event.id);
    this._fullName = UserFullName.fromString(event.fullName);
    this._avatarUrl = UserAvatarUrl.fromUrl(event.avatarUrl);
    this._roles = [];
    this._deleted = null;
  }

  private onUserRoleWasAdded(event: UserRoleWasAdded) {
    this._roles.push(Role.fromString(event.role));
  }

  private onUserRoleWasRemoved(event: UserRoleWasRemoved) {
    this._roles = this._roles.filter((item: Role) => !item.equals(Role.fromString(event.role)));
  }

  private onUserWasDeleted(event: UserWasDeleted) {
    this._deleted = event.createdOn;
  }
}

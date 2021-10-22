import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  readonly id: string;
  readonly fullName: string;
  readonly avatarUrl: string;

  constructor(params: { id: string; fullName: string; avatarUrl: string }) {
    this.id = params.id;
    this.fullName = params.fullName;
    this.avatarUrl = params.avatarUrl;
  }
}

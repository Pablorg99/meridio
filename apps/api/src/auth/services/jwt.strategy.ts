import { JwtPayloadInterface, UserDTO } from '@meridio/contracts';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CreateUserCommand, GetUserQuery } from '../../user/application';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserDTO> {
    const user = await this.queryBus.execute<GetUserQuery, UserDTO>(new GetUserQuery(payload.sub));

    if (!user) {
      await this.commandBus.execute(
        new CreateUserCommand({
          id: payload.sub,
          fullName: payload.name,
          avatarUrl: payload.picture,
        })
      );
      return await this.queryBus.execute<GetUserQuery, UserDTO>(new GetUserQuery(payload.sub));
    }

    return user;
  }
}

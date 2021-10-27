import { CreateTicketDTO, TicketDTO, UserDTO } from '@meridio/contracts';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { User } from '../../../shared/decorators/user.decorator';
import { CreateTicketCommand, FindTicketsByConferenceAndBuyerId, FindTicketsByConferenceId } from '../../application';

@Controller('tickets')
export class TicketController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDTO, @User() user: UserDTO) {
    const command = new CreateTicketCommand({
      id: createTicketDto.id,
      buyerId: user.id,
      conferenceId: createTicketDto.conferenceId,
      assistantInfo: createTicketDto.assistantInfo,
    });

    await this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') conferenceId: string, @User() user: UserDTO) {
    const query = new FindTicketsByConferenceAndBuyerId(conferenceId, user.id);

    return this.queryBus.execute<FindTicketsByConferenceAndBuyerId, Array<TicketDTO>>(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/all')
  async findAll(@Param('id') conferenceId: string) {
    const query = new FindTicketsByConferenceId(conferenceId);

    return this.queryBus.execute<FindTicketsByConferenceId, Array<TicketDTO>>(query);
  }
}

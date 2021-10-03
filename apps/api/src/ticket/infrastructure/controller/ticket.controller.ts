import { CreateTicketDTO, TicketDTO } from '@meridio/contracts';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { CreateTicketCommand, FindTicketsByConferenceId } from '../../application';

@Controller('tickets')
export class TicketController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDTO) {
    const command = new CreateTicketCommand({
      id: createTicketDto.id,
      buyerId: uuid.v4(),
      conferenceId: createTicketDto.conferenceId,
      assistantInfo: createTicketDto.assistantInfo,
    });

    await this.commandBus.execute(command);
  }

  @Get(':id')
  async findAll(@Param('id') conferenceId: string) {
    const query = new FindTicketsByConferenceId(conferenceId);

    return this.queryBus.execute<FindTicketsByConferenceId, Array<TicketDTO>>(query);
  }
}

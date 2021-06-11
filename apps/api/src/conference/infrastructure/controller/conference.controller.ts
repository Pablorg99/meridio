import { ConferenceDTO, CreateConferenceDTO } from '@meridio/contracts';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateConferenceCommand } from '../../application';
import { FindConferenceByIdQuery } from '../query';

@Controller('conferences')
export class ConferenceController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async create(@Body() createConferenceDto: CreateConferenceDTO) {
    const command = new CreateConferenceCommand({
      id: createConferenceDto.id,
      name: createConferenceDto.name,
      url: createConferenceDto.url,
      place: createConferenceDto.place,
      startDate: new Date(createConferenceDto.startDate),
      endDate: new Date(createConferenceDto.endDate),
      logoFile: createConferenceDto.logoFile,
    });

    await this.commandBus.execute(command);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = new FindConferenceByIdQuery(id);

    return this.queryBus.execute<FindConferenceByIdQuery, ConferenceDTO>(query);
  }
}

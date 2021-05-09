import { CreateConferenceDTO } from '@meridio/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateConferenceCommand } from '../../application';

@Controller('conferences')
export class ConferenceController {
  constructor(private commandBus: CommandBus) {}

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
}

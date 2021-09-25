import { ConferenceDTO, CreateConferenceDTO, EditConferenceDTO } from '@meridio/contracts';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateConferenceCommand, EditConferenceCommand,FindConferenceByIdQuery, FindConferenceBySlugQuery } from '../../application';

@Controller('conferences')
export class ConferenceController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async create(@Body() createConferenceDto: CreateConferenceDTO) {
    const command = new CreateConferenceCommand({
      id: createConferenceDto.id,
      name: createConferenceDto.name,
      slug: createConferenceDto.slug,
      place: createConferenceDto.place,
      startDate: new Date(createConferenceDto.startDate),
      endDate: new Date(createConferenceDto.endDate),
      logoFile: createConferenceDto.logoFile,
      isLandingPageOpen: createConferenceDto.isLandingPageOpen,
      isCallForPapersOpen: createConferenceDto.isCallForPapersOpen,
      isTicketSalesOpen: createConferenceDto.isTicketSalesOpen,
    });

    await this.commandBus.execute(command);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() editConferenceDto: EditConferenceDTO) {
    const command = new EditConferenceCommand({
      id,
      name: editConferenceDto.name,
      slug: editConferenceDto.slug,
      place: editConferenceDto.place,
      startDate: new Date(editConferenceDto.startDate),
      endDate: new Date(editConferenceDto.endDate),
      logoFile: editConferenceDto.logoFile,
      isLandingPageOpen: editConferenceDto.isLandingPageOpen,
      isCallForPapersOpen: editConferenceDto.isCallForPapersOpen,
      isTicketSalesOpen: editConferenceDto.isTicketSalesOpen,
    });

    await this.commandBus.execute(command);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = new FindConferenceByIdQuery(id);

    return this.queryBus.execute<FindConferenceByIdQuery, ConferenceDTO>(query);
  }

  @Get('/landings/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    const query = new FindConferenceBySlugQuery(slug);

    return this.queryBus.execute<FindConferenceBySlugQuery, ConferenceDTO>(query);
  }
}

import { CreateProposalDTO, ProposalDTO } from '@meridio/contracts';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateProposalCommand, FindProposalsByConferenceIdQuery } from '../../application';

@Controller('proposals')
export class ProposalController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProposalDto: CreateProposalDTO) {
    const command = new CreateProposalCommand({
      id: createProposalDto.id,
      ownerId: uuid.v4(),
      conferenceId: createProposalDto.conferenceId,
      title: createProposalDto.title,
      description: createProposalDto.description,
      speakerInfo: createProposalDto.speakerInfo,
    });

    await this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findAll(@Param('id') conferenceId: string) {
    const query = new FindProposalsByConferenceIdQuery(conferenceId);

    return this.queryBus.execute<FindProposalsByConferenceIdQuery, Array<ProposalDTO>>(query);
  }
}

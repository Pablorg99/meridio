import { CreateProposalDTO, ProposalDTO, UserDTO } from '@meridio/contracts';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { User } from '../../../shared/decorators/user.decorator';
import {
  CreateProposalCommand,
  FindProposalsByConferenceAndOwnerIdQuery,
  FindProposalsByConferenceIdQuery,
} from '../../application';

@Controller('proposals')
export class ProposalController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProposalDto: CreateProposalDTO, @User() user: UserDTO) {
    const command = new CreateProposalCommand({
      id: createProposalDto.id,
      ownerId: user.id,
      conferenceId: createProposalDto.conferenceId,
      title: createProposalDto.title,
      description: createProposalDto.description,
      speakerInfo: createProposalDto.speakerInfo,
    });

    await this.commandBus.execute(command);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') conferenceId: string, @User() user: UserDTO) {
    const query = new FindProposalsByConferenceAndOwnerIdQuery(conferenceId, user.id);

    return this.queryBus.execute<FindProposalsByConferenceAndOwnerIdQuery, Array<ProposalDTO>>(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/all')
  async findAll(@Param('id') conferenceId: string) {
    const query = new FindProposalsByConferenceIdQuery(conferenceId);

    return this.queryBus.execute<FindProposalsByConferenceIdQuery, Array<ProposalDTO>>(query);
  }
}

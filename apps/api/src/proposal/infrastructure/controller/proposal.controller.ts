import { CreateProposalDTO } from '@meridio/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { CreateProposalCommand } from '../../application';

@Controller('proposals')
export class ProposalController {
  constructor(private commandBus: CommandBus) {}

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
}

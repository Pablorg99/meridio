import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateProposalHandler } from '../application';
import { ProposalController } from './index';
import { proposalProviders } from './proposal.providers';

const commandHandlers = [CreateProposalHandler];

@Module({
  controllers: [ProposalController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [...proposalProviders, ...commandHandlers],
})
export class ProposalModule {}

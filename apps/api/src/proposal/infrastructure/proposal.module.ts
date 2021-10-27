import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import {
  CreateProposalHandler,
  FindProposalsByConferenceAndOwnerIdHandler,
  FindProposalsByConferenceIdHandler,
} from '../application';
import { ProposalController } from './controller';
import { proposalProviders } from './proposal.providers';
import { UpdateProposalsProjectionOnProposalWasCreated } from './subscriber';

const commandHandlers = [CreateProposalHandler];
const queryHandlers = [FindProposalsByConferenceIdHandler, FindProposalsByConferenceAndOwnerIdHandler];
const subscribers = [UpdateProposalsProjectionOnProposalWasCreated];

@Module({
  controllers: [ProposalController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [...proposalProviders, ...commandHandlers, ...queryHandlers, ...subscribers],
})
export class ProposalModule {}

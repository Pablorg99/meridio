import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateConferenceHandler, EditConferenceHandler } from '../application';
import { conferenceProviders } from './conference.providers';
import { ConferenceController } from './controller';
import { ConferenceWasCreatedProjection, ConferenceWasEditedProjection } from './projection';
import { FindConferenceByIdHandler, FindConferenceBySlugHandler } from './query';

const commandHandlers = [CreateConferenceHandler, EditConferenceHandler];
const queryHandlers = [FindConferenceByIdHandler, FindConferenceBySlugHandler];
const viewUpdaters = [ConferenceWasCreatedProjection, ConferenceWasEditedProjection];

@Module({
  controllers: [ConferenceController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [...conferenceProviders, ...commandHandlers, ...queryHandlers, ...viewUpdaters],
})
export class ConferenceModule {}

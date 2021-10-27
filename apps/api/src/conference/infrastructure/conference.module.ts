import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import {
  CreateConferenceHandler,
  EditConferenceHandler,
  FindConferenceByIdHandler,
  FindConferenceBySlugHandler,
  FindConferencesByOwnerIdHandler,
} from '../application';
import { conferenceProviders } from './conference.providers';
import { ConferenceController } from './controller';
import {
  UpdateConferencesProjectionOnConferenceWasCreated,
  UpdateConferencesProjectionOnConferenceWasEdited,
} from './subscriber';

const commandHandlers = [CreateConferenceHandler, EditConferenceHandler];
const queryHandlers = [FindConferenceByIdHandler, FindConferenceBySlugHandler, FindConferencesByOwnerIdHandler];
const viewUpdaters = [
  UpdateConferencesProjectionOnConferenceWasCreated,
  UpdateConferencesProjectionOnConferenceWasEdited,
];

@Module({
  controllers: [ConferenceController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [...conferenceProviders, ...commandHandlers, ...queryHandlers, ...viewUpdaters],
})
export class ConferenceModule {}

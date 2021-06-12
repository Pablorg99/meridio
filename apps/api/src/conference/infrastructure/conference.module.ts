import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { DatabaseModule } from '../../database/database.module';
import { CreateConferenceHandler } from '../application';
import { conferenceProviders } from './conference.providers';
import { ConferenceController } from './controller';
import { ConferenceWasCreatedProjection } from './projection';
import { FindConferenceByIdHandler } from './query';

@Module({
  controllers: [ConferenceController],
  imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
  providers: [CreateConferenceHandler, ...conferenceProviders, ConferenceWasCreatedProjection, FindConferenceByIdHandler],
})
export class ConferenceModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateConferenceHandler } from '../application';
import { conferenceProviders } from './conference.providers';
import { ConferenceController } from './controller';
import { ConferenceInMemoryRepository } from './repository';

export const conferenceModuleMetadata = {
  controllers: [ConferenceController],
  imports: [CqrsModule, ConferenceInMemoryRepository],
  providers: [CreateConferenceHandler, ...conferenceProviders],
};
@Module(conferenceModuleMetadata)
export class ConferenceModule {}

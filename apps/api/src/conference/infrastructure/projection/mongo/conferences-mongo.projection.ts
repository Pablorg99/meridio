import { ConferenceDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../../database/database.provider';
import { ConferenceMapper } from '../../mapper';
import { ConferencesProjection } from '../conferences.projection';
import { ConferenceDocument } from './conference.document';
import { ConferenceSchema } from './conference.schema';

export class ConferencesMongoProjection implements ConferencesProjection {
  private model: Model<ConferenceDocument>;

  constructor(@Inject(mongoConnection) connection: Connection) {
    this.model = connection.model<ConferenceDocument>('conferences', ConferenceSchema);
  }

  async save(conference: ConferenceDTO): Promise<void> {
    await this.model.create({
      _id: conference.id,
      ...conference,
    });
  }

  async find(id: string): Promise<ConferenceDTO | null> {
    const document = await this.model.findOne({ _id: id });

    if (!document) {
      return null;
    }

    return ConferenceMapper.documentToDTO(document);
  }
}

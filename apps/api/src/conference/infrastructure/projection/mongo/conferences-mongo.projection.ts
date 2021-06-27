import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';
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

  async update(conference: ConferenceDTO): Promise<void> {
    const { id, ...document } = conference;
    console.log(document);
    await this.model.updateOne({ _id: id }, document);
  }

  async exists(id: string): Promise<boolean> {
    return await this.model.exists({ _id: id });
  }

  async find(id: string): Promise<Nullable<ConferenceDTO>> {
    const document = await this.model.findOne({ _id: id });

    if (!document) {
      return null;
    }

    return ConferenceMapper.documentToDTO(document);
  }
}

import { ConferenceDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';
import { Inject } from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { ConferencesProjection, Criteria } from '../../domain';
import { ConferenceMapper } from '../mapper';
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
    await this.model.updateOne({ _id: id }, document);
  }

  async exists(criteria: Criteria): Promise<boolean> {
    const query = ConferencesMongoProjection.queryFromCriteria(criteria);
    return await this.model.exists(query);
  }

  async find(criteria: Criteria): Promise<Nullable<ConferenceDTO>> {
    const query = ConferencesMongoProjection.queryFromCriteria(criteria);

    const document = await this.model.findOne(query);

    if (!document) {
      return null;
    }

    return ConferenceMapper.documentToDTO(document);
  }

  private static queryFromCriteria(criteria: Criteria) {
    let query = {};

    if (criteria.id) {
      query = { ...query, _id: criteria.id.value };
    }

    if (criteria.slug) {
      query = { ...query, slug: criteria.slug.value };
    }

    return query;
  }
}

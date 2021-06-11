import { ConferenceDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { ConferenceNotFound } from '../../../domain';
import { ConferenceMapper } from '../../mapper';
import { ConferenceProjection, conferenceProjection } from '../../read-model';
import { FindConferenceByIdQuery } from '../find-conference-by-id.query';

@QueryHandler(FindConferenceByIdQuery)
export class FindConferenceByIdHandler implements IQueryHandler<FindConferenceByIdQuery, ConferenceDTO> {
  constructor(@Inject(conferenceProjection) private projections: Model<ConferenceProjection>) {}

  async execute(query: FindConferenceByIdQuery) {
    const projection = await this.projections.findOne({ _id: query.id });

    if (!projection) {
      throw new ConferenceNotFound(query.id);
    }

    return ConferenceMapper.projectionToDTO(projection);
  }
}

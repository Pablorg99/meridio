import { TicketDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import { mongoConnection } from '../../../database/database.provider';
import { TicketsProjection } from '../../domain';
import { TicketMapper } from '../mapper';
import { TicketDocument } from './ticket.document';
import { TicketSchema } from './ticket.schema';

export class TicketsMongoProjection implements TicketsProjection {
  private model: Model<TicketDocument>;

  constructor(@Inject(mongoConnection) connection: Connection) {
    this.model = connection.model<TicketDocument>('tickets', TicketSchema);
  }

  async save(ticket: TicketDTO): Promise<void> {
    await this.model.create({
      _id: ticket.id,
      ...ticket,
    });
  }

  async find(conferenceId: string): Promise<Array<TicketDTO>> {
    const ticketDocuments = await this.model.find({ conferenceId });

    return TicketMapper.documentToDTO(ticketDocuments);
  }
}

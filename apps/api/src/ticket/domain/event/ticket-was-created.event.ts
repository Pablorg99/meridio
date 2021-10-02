import { StorableEvent } from 'event-sourcing-nestjs';

export class TicketWasCreated extends StorableEvent {
  eventAggregate = 'ticket';
  eventVersion = 1;

  readonly id: string;
  readonly buyerId: string;
  readonly conferenceId: string;
  readonly assistantInfo: {
    fullName: string;
    email: string;
    age?: number;
    city?: string;
    country?: string;
    gender?: string;
  };

  constructor(params: {
    id: string;
    buyerId: string;
    conferenceId: string;
    assistantInfo: {
      fullName: string;
      email: string;
      age?: number;
      city?: string;
      country?: string;
      gender?: string;
    };
  }) {
    super();
    this.id = params.id;
    this.buyerId = params.buyerId;
    this.conferenceId = params.conferenceId;
    this.assistantInfo = params.assistantInfo;
  }
}

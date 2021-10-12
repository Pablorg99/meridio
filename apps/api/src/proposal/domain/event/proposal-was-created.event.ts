import { StorableEvent } from 'event-sourcing-nestjs';

export class ProposalWasCreated extends StorableEvent {
  eventAggregate = 'proposal';
  eventVersion = 1;

  readonly id: string;
  readonly ownerId: string;
  readonly conferenceId: string;
  readonly title: string;
  readonly description: string;
  readonly speakerInfo: {
    fullName: string;
    email: string;
    age?: number;
    city?: string;
    country?: string;
    gender?: string;
  };

  constructor(params: {
    id: string;
    ownerId: string;
    conferenceId: string;
    title: string;
    description: string;
    speakerInfo: {
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
    this.ownerId = params.ownerId;
    this.conferenceId = params.conferenceId;
    this.title = params.title;
    this.description = params.description;
    this.speakerInfo = params.speakerInfo;
  }
}

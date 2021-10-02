import { AggregateRoot } from '@nestjs/cqrs';

import { ConferenceId, UserId, UserInfo } from '../../../shared/domain';
import { TicketWasCreated } from '../event';
import { TicketId } from './ticket-id';

export class Ticket extends AggregateRoot {
  private _id: TicketId;
  private _buyerId: UserId;
  private _conferenceId: ConferenceId;
  private _assistantInfo: UserInfo;

  private constructor() {
    super();
  }

  static create(params: { conferenceId: ConferenceId; assistantInfo: UserInfo; id: TicketId; buyerId: UserId }) {
    const ticket = new Ticket();
    const event = Ticket.buildTicketWasCreatedEvent(params);
    ticket.apply(event);
    return ticket;
  }

  private static buildTicketWasCreatedEvent(params: {
    conferenceId: ConferenceId;
    assistantInfo: UserInfo;
    id: TicketId;
    buyerId: UserId;
  }) {
    return new TicketWasCreated({
      id: params.id.value,
      buyerId: params.buyerId.value,
      conferenceId: params.conferenceId.value,
      assistantInfo: {
        fullName: params.assistantInfo.fullName.value,
        email: params.assistantInfo.email.value,
        age: params.assistantInfo.age?.value,
        country: params.assistantInfo.country?.value,
        city: params.assistantInfo.city?.value,
        gender: params.assistantInfo.gender?.value,
      },
    });
  }

  get id(): TicketId {
    return this._id;
  }

  get buyerId(): UserId {
    return this._buyerId;
  }

  get conferenceId(): ConferenceId {
    return this._conferenceId;
  }

  get assistantInfo(): UserInfo {
    return this._assistantInfo;
  }

  private onTicketWasCreated(event: TicketWasCreated) {
    this._id = TicketId.fromString(event.id);
    this._buyerId = UserId.fromString(event.buyerId);
    this._conferenceId = ConferenceId.fromString(event.conferenceId);
    this._assistantInfo = UserInfo.fromDTO(event.assistantInfo);
  }
}

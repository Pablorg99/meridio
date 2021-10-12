import { AggregateRoot } from '@nestjs/cqrs';

import { ConferenceId, UserId, UserInfo } from '../../../shared/domain';
import { ProposalWasCreated } from '../event';
import { ProposalDescription } from './proposal-description';
import { ProposalId } from './proposal-id';
import { ProposalTitle } from './proposal-title';

export class Proposal extends AggregateRoot {
  private _id: ProposalId;
  private _ownerId: UserId;
  private _conferenceId: ConferenceId;
  private _title: ProposalTitle;
  private _description: ProposalDescription;
  private _speakerInfo: UserInfo;

  private constructor() {
    super();
  }

  static create(params: {
    id: ProposalId;
    ownerId: UserId;
    conferenceId: ConferenceId;
    title: ProposalTitle;
    description: ProposalDescription;
    speakerInfo: UserInfo;
  }) {
    const proposal = new Proposal();
    const event = Proposal.buildProposalWasCreatedEvent(params);
    proposal.apply(event);
    return proposal;
  }

  private static buildProposalWasCreatedEvent(params: {
    id: ProposalId;
    ownerId: UserId;
    conferenceId: ConferenceId;
    title: ProposalTitle;
    description: ProposalDescription;
    speakerInfo: UserInfo;
  }) {
    return new ProposalWasCreated({
      id: params.id.value,
      ownerId: params.ownerId.value,
      conferenceId: params.conferenceId.value,
      title: params.title.value,
      description: params.description.value,
      speakerInfo: {
        fullName: params.speakerInfo.fullName.value,
        email: params.speakerInfo.email.value,
        age: params.speakerInfo.age?.value,
        country: params.speakerInfo.country?.value,
        city: params.speakerInfo.city?.value,
        gender: params.speakerInfo.gender?.value,
      },
    });
  }

  get id() {
    return this._id;
  }

  get ownerId() {
    return this._ownerId;
  }

  get conferenceId() {
    return this._conferenceId;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get speakerInfo() {
    return this._speakerInfo;
  }

  private onTicketWasCreated(event: ProposalWasCreated) {
    this._id = ProposalId.fromString(event.id);
    this._ownerId = UserId.fromString(event.ownerId);
    this._conferenceId = ConferenceId.fromString(event.conferenceId);
    this._title = ProposalTitle.fromString(event.title);
    this._description = ProposalDescription.fromString(event.description);
    this._speakerInfo = UserInfo.fromDTO(event.speakerInfo);
  }
}

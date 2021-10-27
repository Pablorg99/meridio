import { ConferenceId, UserId } from '../../../shared/domain';
import { ConferenceSlug } from '../model';

export class Criteria {
  readonly id?: ConferenceId;
  readonly slug?: ConferenceSlug;
  readonly ownerId?: UserId;

  constructor(params: { id?: ConferenceId; slug?: ConferenceSlug; ownerId?: UserId }) {
    this.id = params.id;
    this.slug = params.slug;
    this.ownerId = params.ownerId;
  }
}

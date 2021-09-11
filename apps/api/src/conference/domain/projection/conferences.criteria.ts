import { ConferenceId, ConferenceSlug } from '../model';

export class Criteria {
  readonly id?: ConferenceId;
  readonly slug?: ConferenceSlug;

  constructor(params: { id?: ConferenceId; slug?: ConferenceSlug }) {
    this.id = params.id;
    this.slug = params.slug;
  }
}

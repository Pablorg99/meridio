export class ConferenceSlugNotFoundError extends Error {
  constructor(slug: string) {
    super(`Conference with slug ${slug} does not exists`);
  }
}

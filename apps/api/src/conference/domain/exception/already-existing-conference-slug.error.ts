export class AlreadyExistingConferenceSlugError extends Error {
  constructor(slug: string) {
    super(`Already exists a conference with the slug: ${slug}`);
  }
}

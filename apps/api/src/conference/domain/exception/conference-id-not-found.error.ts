export class ConferenceIdNotFoundError extends Error {
  constructor(id: string) {
    super(`Conference with id ${id} does not exists`);
  }
}

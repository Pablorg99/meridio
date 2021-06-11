export class ConferenceNotFound extends Error {
  constructor(id: string) {
    super(`Conference with id ${id} does not exists`);
  }
}

export class LandingPageClosed extends Error {
  constructor(id: string) {
    super(`The landing page of the conference with id: ${id}, is not open`);
  }
}

export class StartDateIsPastError extends Error {
  constructor(startDate: Date) {
    super(`Start date: ${startDate.toISOString()} is a past date`);
  }
}

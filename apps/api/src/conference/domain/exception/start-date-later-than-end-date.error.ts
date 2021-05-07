export class StartDateLaterThanEndDateError extends Error {
  constructor(startDate: Date, endDate: Date) {
    super(`Start date: ${startDate.toISOString()} is later than end date: ${endDate.toISOString()}`);
  }
}

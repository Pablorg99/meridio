import { ValueObject } from '@meridio/domain';

import { StartDateIsPastError, StartDateLaterThanEndDateError } from '../exception';

export class ConferenceDateRange extends ValueObject<{ startDate: number; endDate: number }> {
  static fromStartAndEndDate(startDate: Date, endDate: Date) {
    ConferenceDateRange.validateDateRange(startDate, endDate);
    return new ConferenceDateRange({ startDate: startDate.getTime(), endDate: endDate.getTime() });
  }

  private static validateDateRange(startDate: Date, endDate: Date) {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const isStartDateLaterThanEndDate = startDate > endDate;
    const isStartDatePast = startDate < today;

    if (isStartDateLaterThanEndDate) {
      throw new StartDateLaterThanEndDateError(startDate, endDate);
    }

    if (isStartDatePast) {
      throw new StartDateIsPastError(startDate);
    }
  }

  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }
}

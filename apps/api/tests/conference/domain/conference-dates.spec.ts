import { StartDateIsPastError, StartDateLaterThanEndDateError } from '../../../src/conference/domain/exception';
import { ConferenceDateRange } from '../../../src/conference/domain/model/conference-date-range';

const DAY_IN_MILLISECONDS = 24 * 3600 * 1000;

describe('Conference dates value object', () => {
  it('should include the start and end dates in its value', () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const tomorrow = new Date(today.getTime() + DAY_IN_MILLISECONDS);

    const dateRange = ConferenceDateRange.fromStartAndEndDate(today, tomorrow);

    expect(dateRange.startDate).toStrictEqual(today.getTime());
    expect(dateRange.endDate).toStrictEqual(tomorrow.getTime());
  });

  it('should throw an error when the start date is later than the end date', () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const tomorrow = new Date(today.getTime() + DAY_IN_MILLISECONDS);

    expect(() => ConferenceDateRange.fromStartAndEndDate(tomorrow, today)).toThrowError(StartDateLaterThanEndDateError);
  });

  it('should throw an error when the start date is past', () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const yesterday = new Date(today.getTime() - DAY_IN_MILLISECONDS);

    expect(() => ConferenceDateRange.fromStartAndEndDate(yesterday, today)).toThrowError(StartDateIsPastError);
  });
});

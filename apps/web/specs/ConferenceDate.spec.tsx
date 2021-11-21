import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { ConferenceDate } from '../components/ConferenceDate';

describe('ConferenceDate', function () {
  const defaultProps = {
    startDate: new Date(),
    endDate: new Date(),
  };

  it('should show the conference day formatted when start and end dates are the same', function () {
    const firstOfMay2022 = new Date('2022-05-01');
    const props = {
      ...defaultProps,
      startDate: firstOfMay2022,
      endDate: firstOfMay2022,
    };

    render(<ConferenceDate {...props} />);

    expect(screen.queryByText('1 mayo 2022')).toBeInTheDocument();
  });

  it('should show the starting and ending days with the month when start and end dates are in the same month', function () {
    const firstOfMay2022 = new Date('2022-05-01');
    const thirdOfMay2022 = new Date('2022-05-03');
    const props = {
      ...defaultProps,
      startDate: firstOfMay2022,
      endDate: thirdOfMay2022,
    };

    render(<ConferenceDate {...props} />);

    expect(screen.queryByText('1-3 mayo 2022')).toBeInTheDocument();
  });

  it('should show the start and end dates of the conference with the months when start and end dates are in different months', function () {
    const firstOfApril2022 = new Date('2022-04-01');
    const firstOfMay2022 = new Date('2022-05-01');
    const props = {
      ...defaultProps,
      startDate: firstOfApril2022,
      endDate: firstOfMay2022,
    };

    render(<ConferenceDate {...props} />);

    expect(screen.queryByText('1 abril - 1 mayo 2022')).toBeInTheDocument();
  });
});

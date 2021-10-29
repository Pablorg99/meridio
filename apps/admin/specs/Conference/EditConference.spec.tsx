import '@testing-library/jest-dom';

import { ConferenceDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { EditConferenceComponent } from '../../components/Conference/EditConference';

describe('Edit existing conference', function () {
  const conference = aConference();
  const defaultProps = {
    fetchConference: () => {},
    isFetching: false,
    isError: false,
    conference,
    onEditConference: () => {},
  };

  describe('layout', () => {
    it('should render the conference form with the conference attributes', () => {
      render(<EditConferenceComponent {...defaultProps} />);

      expect(screen.getByRole('form', { name: 'conference-form' })).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.slug)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.place)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.startDate)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.endDate)).toBeInTheDocument();
    });

    it('should not render the form while there is no conference', function () {
      const props = {
        ...defaultProps,
        conference: undefined,
      };

      render(<EditConferenceComponent {...props} />);

      expect(() => screen.getByRole('form', { name: 'conference-form' })).toThrow();
    });
  });

  describe('behaviour', () => {
    it('should fetch the conference data', () => {
      const props = {
        ...defaultProps,
        fetchConference: jest.fn(),
      };

      render(<EditConferenceComponent {...props} />);

      expect(props.fetchConference).toBeCalledTimes(1);
    });

    it('should show a loading when the data is fetching', () => {
      const props = {
        ...defaultProps,
        isFetching: true,
      };

      render(<EditConferenceComponent {...props} />);

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
      expect(() => screen.getByText(conference.name)).toThrow();
    });

    it('should show an error message when an error occurs', () => {
      const props = {
        ...defaultProps,
        isError: true,
      };

      render(<EditConferenceComponent {...props} />);

      expect(screen.getByText('There was an unexpected error, try reloading the page.')).toBeInTheDocument();
      expect(() => screen.getByText(conference.name)).toThrow();
    });
  });
});

function aConference(): ConferenceDTO {
  return {
    id: faker.datatype.uuid(),
    ownerId: faker.datatype.uuid(),
    name: faker.random.word(),
    slug: faker.random.word(),
    place: faker.random.word(),
    startDate: faker.date.soon().toISOString().split('T')[0],
    endDate: faker.date.future().toISOString().split('T')[0],
    isLandingPageOpen: faker.datatype.boolean(),
    isCallForPapersOpen: faker.datatype.boolean(),
    isTicketSalesOpen: faker.datatype.boolean(),
  };
}

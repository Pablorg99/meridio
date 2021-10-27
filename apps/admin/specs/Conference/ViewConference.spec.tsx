import '@testing-library/jest-dom';

import { ConferenceDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import faker from 'faker';

import { ViewConferenceComponent } from '../../components/Conference/ViewConference';

describe('ViewConference', () => {
  const conference = aConference();
  const defaultProps = {
    fetchConference: () => {},
    conference,
    isFetching: false,
    isError: false,
  };

  describe('Layout', () => {
    it('should show the data of the passed conference', () => {
      render(<ViewConferenceComponent {...defaultProps} />);

      expect(screen.getByText(conference.name)).toBeInTheDocument();
      expect(screen.getByText(conference.place)).toBeInTheDocument();
      expect(screen.getByText(conference.slug)).toBeInTheDocument();
      expect(screen.getByText(conference.startDate)).toBeInTheDocument();
      expect(screen.getByText(conference.endDate)).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    it('should fetch the conference data', () => {
      const props = {
        ...defaultProps,
        fetchConference: jest.fn(),
      };

      render(<ViewConferenceComponent {...props} />);

      expect(props.fetchConference).toBeCalledTimes(1);
    });

    it('should show a loading when the data is fetching', () => {
      const props = {
        ...defaultProps,
        isFetching: true,
      };

      render(<ViewConferenceComponent {...props} />);

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
      expect(() => screen.getByText(conference.name)).toThrow();
    });

    it('should show an error message when an error occurs', () => {
      const props = {
        ...defaultProps,
        isError: true,
      };

      render(<ViewConferenceComponent {...props} />);

      expect(screen.getByText('Error')).toBeInTheDocument();
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

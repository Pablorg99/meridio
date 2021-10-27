import '@testing-library/jest-dom';

import { ConferenceDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import faker from 'faker';

import { ConferencesList } from '../../components/Conference/ConferencesList';

describe('Conferences list', function () {
  const defaultProps = {
    conferences: [aConference(), aConference()],
    fetchConferences: () => {},
    isFetching: false,
    isError: false,
  };

  describe('layout', function () {
    it('should show a list with the conferences passed', function () {
      const [firstConference, secondConference] = [aConference(), aConference()];
      const props = {
        ...defaultProps,
        conferences: [firstConference, secondConference],
      };

      render(<ConferencesList {...props} />);

      const [firstRenderedConference, secondRenderedConference] = screen.getAllByRole('listitem');
      expect(firstRenderedConference).toHaveTextContent(firstConference.name);
      expect(secondRenderedConference).toHaveTextContent(secondConference.name);
    });
  });

  describe('behaviour', function () {
    it('should fetch the conferences', function () {
      const props = {
        ...defaultProps,
        fetchConferences: jest.fn(),
      };

      render(<ConferencesList {...props} />);

      expect(props.fetchConferences).toHaveBeenCalled();
    });

    it('should show a loader while fetching the conferences', function () {
      const props = {
        ...defaultProps,
        conferences: undefined,
        isFetching: true,
      };

      render(<ConferencesList {...props} />);

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    });

    it('should show an error message if there is an error fetching the conferences', function () {
      const props = {
        ...defaultProps,
        conferences: undefined,
        isError: true,
      };

      render(<ConferencesList {...props} />);

      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});

function aConference(): ConferenceDTO {
  return {
    id: faker.datatype.uuid(),
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

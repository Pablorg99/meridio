import '@testing-library/jest-dom';

import { ConferenceDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';

import { ConferencesList } from '../../components/Conference/ConferencesList';

describe('Conferences list', function () {
  const defaultProps = {
    conferences: [aConference(), aConference()],
    fetchConferences: () => {},
    isFetching: false,
    isError: false,
    navigateToConferencePage: () => {},
    navigateToLandingPage: () => {},
    navigateToProposalsPage: () => {},
    navigateToTicketsPage: () => {},
    navigateToCreateConferencePage: () => {},
  };

  describe('layout', function () {
    it('should show a list with the conferences passed', function () {
      const [firstConference, secondConference] = [aConference(), aConference()];
      const props = {
        ...defaultProps,
        conferences: [firstConference, secondConference],
      };

      render(<ConferencesList {...props} />);

      const [firstConferenceRow, secondConferenceRow] = screen.getAllByRole('row');
      expect(firstConferenceRow).toHaveTextContent(firstConference.name);
      expect(firstConferenceRow).toHaveTextContent(firstConference.slug);
      expect(firstConferenceRow).toHaveTextContent('Ver charlas');
      expect(firstConferenceRow).toHaveTextContent('Ver entradas');
      expect(secondConferenceRow).toHaveTextContent(secondConference.name);
      expect(secondConferenceRow).toHaveTextContent(secondConference.slug);
      expect(secondConferenceRow).toHaveTextContent('Ver charlas');
      expect(secondConferenceRow).toHaveTextContent('Ver entradas');
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

      expect(screen.getByText('There was an unexpected error, try reloading the page.')).toBeInTheDocument();
    });

    it('should go to the conference page when clicking the conference name', function () {
      const conference = aConference();
      const props = {
        ...defaultProps,
        conferences: [conference],
        navigateToConferencePage: jest.fn(),
      };

      render(<ConferencesList {...props} />);
      const conferenceName = screen.getByText(conference.name);
      userEvent.click(conferenceName);

      expect(props.navigateToConferencePage).toHaveBeenCalledWith(conference.id);
    });

    it('should go to the landing page when clicking the conference slug', function () {
      const conference = aConference();
      const props = {
        ...defaultProps,
        conferences: [conference],
        navigateToLandingPage: jest.fn(),
      };

      render(<ConferencesList {...props} />);
      const conferenceSlug = screen.getByText(conference.slug);
      userEvent.click(conferenceSlug);

      expect(props.navigateToLandingPage).toHaveBeenCalledWith(conference.slug);
    });

    it('should go to the conference proposals when clicking the proposals button', function () {
      const conference = aConference();
      const props = {
        ...defaultProps,
        conferences: [conference],
        navigateToProposalsPage: jest.fn(),
      };

      render(<ConferencesList {...props} />);
      const proposalsButton = screen.getByRole('button', { name: 'Ver charlas' });
      userEvent.click(proposalsButton);

      expect(props.navigateToProposalsPage).toHaveBeenCalledWith(conference.id);
    });

    it('should go to the conference tickets when clicking the tickets button', function () {
      const conference = aConference();
      const props = {
        ...defaultProps,
        conferences: [conference],
        navigateToTicketsPage: jest.fn(),
      };

      render(<ConferencesList {...props} />);
      const ticketsButton = screen.getByRole('button', { name: 'Ver entradas' });
      userEvent.click(ticketsButton);

      expect(props.navigateToTicketsPage).toHaveBeenCalledWith(conference.id);
    });

    it('should go to the create conference page when clicking the add conference button', function () {
      const conference = aConference();
      const props = {
        ...defaultProps,
        navigateToCreateConferencePage: jest.fn(),
      };

      render(<ConferencesList {...props} />);
      const addConferenceButton = screen.getByRole('button', { name: 'Crear conferencia' });
      userEvent.click(addConferenceButton);

      expect(props.navigateToCreateConferencePage).toHaveBeenCalled();
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

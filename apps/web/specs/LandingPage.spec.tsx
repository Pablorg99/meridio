import '@testing-library/jest-dom';

import { ConferenceDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';

import { LandingPage } from '../components/LandingPage';

describe('LandingPage', function () {
  const conference = aConference();
  const defaultProps = {
    conference,
    fetchLandingPage: () => {},
    isError: false,
    isFetching: false,
    navigateToBuyTicketPage: () => {},
    navigateToProposalsPage: () => {},
  };

  describe('layout', function () {
    it('should show the conference info', function () {
      render(<LandingPage {...defaultProps} />);

      expect(screen.queryByText(conference.name)).toBeInTheDocument();
      expect(screen.queryByText(conference.place)).toBeInTheDocument();
      expect(screen.queryByText(conference.slug)).toBeInTheDocument();
      expect(screen.queryByText(conference.startDate)).toBeInTheDocument();
      expect(screen.queryByText(conference.endDate)).toBeInTheDocument();

      expect(screen.queryByRole('button', { name: 'Adquirir entrada' })).not.toBeInTheDocument();
    });

    it('should have a button that goes to the ticket buy page', function () {
      const props = {
        ...defaultProps,
        conference: aConferenceWithTicketSalesOpen(),
        navigateToBuyTicketPage: jest.fn(),
      };
      render(<LandingPage {...props} />);

      const buyTicketButton = screen.getByRole('button', { name: 'Adquirir entrada' });
      userEvent.click(buyTicketButton);

      expect(props.navigateToBuyTicketPage).toHaveBeenCalledTimes(1);
    });

    it('should have a button that goes to the proposals page', function () {
      const props = {
        ...defaultProps,
        conference: aConferenceWithCFPOpen(),
        navigateToProposalsPage: jest.fn(),
      };
      render(<LandingPage {...props} />);

      const proposalButton = screen.getByRole('button', { name: 'Proponer una charla' });
      userEvent.click(proposalButton);

      expect(props.navigateToProposalsPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('behaviour', function () {
    it('should fetch the landing page info', function () {
      const props = {
        ...defaultProps,
        fetchLandingPage: jest.fn(),
      };

      render(<LandingPage {...props} />);

      expect(props.fetchLandingPage).toHaveBeenCalledTimes(1);
    });

    it('should show an error when the landing page info is not found', function () {
      const props = {
        ...defaultProps,
        isFetching: true,
      };

      render(<LandingPage {...props} />);

      expect(screen.queryByText('Loading')).toBeInTheDocument();
    });

    it('should show a loading when the landing page info is being fetched', function () {
      const props = {
        ...defaultProps,
        isError: true,
      };

      render(<LandingPage {...props} />);

      expect(screen.queryByText('Error')).toBeInTheDocument();
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
    isLandingPageOpen: true,
    isCallForPapersOpen: false,
    isTicketSalesOpen: false,
  };
}

function aConferenceWithTicketSalesOpen(): ConferenceDTO {
  return {
    ...aConference(),
    isTicketSalesOpen: true,
  };
}

function aConferenceWithCFPOpen(): ConferenceDTO {
  return {
    ...aConference(),
    isCallForPapersOpen: true,
  };
}

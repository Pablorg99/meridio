import '@testing-library/jest-dom';

import { TicketDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import faker from 'faker';

import { TicketsList } from '../../components/Ticket/TicketsList';

describe('Tickets list', function () {
  const defaultProps = {
    tickets: [aTicket(), aTicket()],
    fetchTickets: () => {},
    isFetching: false,
    isError: false,
  };

  describe('layout', function () {
    it('should show a table with the tickets passed with information about the assistants', function () {
      const firstTicket = aTicket();
      const secondTicket = aTicket();
      const props = {
        ...defaultProps,
        tickets: [firstTicket, secondTicket],
      };

      render(<TicketsList {...props} />);

      const [headersRow, firstTicketRow, secondTicketRow] = screen.getAllByRole('row');
      expect(headersRow).toHaveTextContent('Nombre completo');
      expect(headersRow).toHaveTextContent('Email');
      expect(firstTicketRow).toHaveTextContent(firstTicket.assistantInfo.fullName);
      expect(firstTicketRow).toHaveTextContent(firstTicket.assistantInfo.email);
      expect(secondTicketRow).toHaveTextContent(secondTicket.assistantInfo.fullName);
      expect(secondTicketRow).toHaveTextContent(secondTicket.assistantInfo.email);
    });
  });

  describe('behaviour', function () {
    it('should fetch the tickets', function () {
      const props = {
        ...defaultProps,
        fetchTickets: jest.fn(),
      };

      render(<TicketsList {...props} />);

      expect(props.fetchTickets).toHaveBeenCalledTimes(1);
    });

    it('should show a loading when the data is fetching', () => {
      const props = {
        ...defaultProps,
        isFetching: true,
      };

      render(<TicketsList {...props} />);

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    });

    it('should show an error message when an error occurs', () => {
      const props = {
        ...defaultProps,
        isError: true,
      };

      render(<TicketsList {...props} />);

      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});

function aTicket(): TicketDTO {
  return {
    id: faker.datatype.uuid(),
    conferenceId: faker.datatype.uuid(),
    assistantInfo: {
      fullName: faker.name.findName(),
      email: faker.internet.email(),
    },
  };
}

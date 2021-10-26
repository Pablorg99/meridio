import '@testing-library/jest-dom';

import { TicketDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { TicketPage } from '../components/TicketPage';

describe('Ticket page', function () {
  const defaultProps = {
    fetchTicket: () => {},
    ticket: aTicket(),
    onBuyTicket: () => {},
    isFetching: false,
  };

  it('should fetch the ticket', function () {
    const props = {
      ...defaultProps,
      fetchTicket: jest.fn(),
    };

    render(<TicketPage {...props} />);

    expect(props.fetchTicket).toHaveBeenCalled();
  });

  it('should show the buy ticket form when there is no ticket', function () {
    const props = {
      ...defaultProps,
      ticket: undefined,
    };

    render(<TicketPage {...props} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should show the ticket information if there is a ticket', function () {
    const props = {
      ...defaultProps,
      ticket: aTicket(),
    };

    render(<TicketPage {...props} />);

    expect(screen.getByRole('heading', { name: 'Tu entrada' })).toBeInTheDocument();
    expect(screen.getByText(props.ticket.assistantInfo.fullName)).toBeInTheDocument();
    expect(screen.getByText(props.ticket.assistantInfo.email)).toBeInTheDocument();
  });

  it('should show a loader while fecthing', function () {
    const props = {
      ...defaultProps,
      isFetching: true,
    };

    render(<TicketPage {...props} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});

function aTicket(): TicketDTO {
  return {
    id: faker.datatype.uuid(),
    conferenceId: faker.datatype.uuid(),
    buyerId: faker.datatype.uuid(),
    assistantInfo: {
      fullName: faker.name.findName(),
      email: faker.internet.email(),
    },
  };
}

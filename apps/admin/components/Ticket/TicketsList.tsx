import { TicketDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  tickets?: Array<TicketDTO>;
  fetchTickets(): void;
  isFetching: boolean;
  isError: boolean;
};

export const TicketsList: React.FunctionComponent<Props> = ({ tickets, fetchTickets, isFetching, isError }) => {
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  if (isFetching) {
    return <div data-testid="loading-icon">Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (tickets) {
    return (
      <table>
        <tbody>
          <tr>
            <th>Nombre completo</th>
            <th>Email</th>
          </tr>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.assistantInfo.fullName}</td>
              <td>{ticket.assistantInfo.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return null;
};

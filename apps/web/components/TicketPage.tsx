import { TicketDTO } from '@meridio/contracts';
import { BuyTicketComponent, BuyTicketFormData } from '@meridio/ui';
import React, { useEffect } from 'react';

type Props = {
  fetchTicket(): void;
  ticket?: TicketDTO;
  onBuyTicket(data: BuyTicketFormData): void;
  isFetching: boolean;
};

export const TicketPage: React.FunctionComponent<Props> = ({ fetchTicket, ticket, onBuyTicket, isFetching }) => {
  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  if (isFetching) {
    return <span data-testid="loader">Loading...</span>;
  }

  if (ticket) {
    return (
      <div>
        <h1>Tu entrada</h1>
        <span>{ticket.assistantInfo.fullName}</span>
        <span>{ticket.assistantInfo.email}</span>
      </div>
    );
  }

  return <BuyTicketComponent onBuyTicket={onBuyTicket} />;
};

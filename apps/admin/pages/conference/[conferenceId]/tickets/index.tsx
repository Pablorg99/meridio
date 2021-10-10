import { TicketDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';

import { TicketsList } from '../../../../components/Ticket/TicketsList';

export default function ViewTickets() {
  const router = useRouter();
  const { conferenceId } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tickets, setTickets] = useState<Array<TicketDTO>>();

  const fetchTickets = useCallback(() => {
    if (conferenceId) {
      setIsFetching(true);
      axios
        .get<Array<TicketDTO>>(`http://localhost:3333/api/tickets/${conferenceId}`)
        .then((response) => {
          setTickets(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [conferenceId]);

  return <TicketsList tickets={tickets} fetchTickets={fetchTickets} isFetching={isFetching} isError={isError} />;
}

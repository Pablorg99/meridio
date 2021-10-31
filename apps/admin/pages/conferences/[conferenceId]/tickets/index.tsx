import { TicketDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { AppBar } from '../../../../components/AppBar';
import { TicketsList } from '../../../../components/Ticket/TicketsList';

export default function ViewTickets() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceId } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tickets, setTickets] = useState<Array<TicketDTO>>();
  const navigateToAddTicketPage = () => router.push(`/conferences/${conferenceId}/tickets/new`);

  const fetchTickets = useCallback(() => {
    if (conferenceId && !loading) {
      setIsFetching(true);
      axios
        .get<Array<TicketDTO>>(`http://localhost:3333/api/tickets/${conferenceId}/all`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setTickets(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [conferenceId, loading, session?.accessToken]);

  return (
    <AppBar session={session}>
      <TicketsList
        tickets={tickets}
        fetchTickets={fetchTickets}
        isFetching={isFetching}
        isError={isError}
        navigateToAddTicketPage={navigateToAddTicketPage}
      />
    </AppBar>
  );
}

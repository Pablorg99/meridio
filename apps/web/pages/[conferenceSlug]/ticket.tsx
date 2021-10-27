import { ConferenceDTO, CreateTicketDTO, TicketDTO } from '@meridio/contracts';
import { BuyTicketFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';
import * as uuid from 'uuid';

import { TicketPage } from '../../components/TicketPage';

export default function BuyTicket() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceSlug } = router.query;

  const [isFetching, setIsFetching] = useState(true);
  const [conferenceId, setConferenceId] = useState('');
  const [ticket, setTicket] = useState<TicketDTO>();

  useEffect(() => {
    if (conferenceSlug) {
      axios.get<ConferenceDTO>(`http://localhost:3333/api/conferences/landings/${conferenceSlug}`).then((response) => {
        setConferenceId(response.data.id);
      });
    }
  }, [conferenceSlug]);

  const fetchTicket = useCallback(() => {
    if (conferenceId && !loading) {
      axios
        .get<Array<TicketDTO>>(`http://localhost:3333/api/tickets/${conferenceId}`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          const [ticket] = response.data;
          setTicket(ticket);
          setIsFetching(false);
        });
    }
  }, [conferenceId, loading, session?.accessToken]);

  const onBuyTicket = useCallback(
    async (data: BuyTicketFormData) => {
      if (conferenceId && !loading) {
        const body: CreateTicketDTO = {
          id: uuid.v4(),
          conferenceId: conferenceId,
          assistantInfo: data,
        };
        await axios.post('http://localhost:3333/api/tickets', body, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });
        await router.push(`/${conferenceSlug}`);
      }
    },
    [conferenceId, conferenceSlug, loading, router, session?.accessToken]
  );

  return <TicketPage fetchTicket={fetchTicket} ticket={ticket} isFetching={isFetching} onBuyTicket={onBuyTicket} />;
}

import { CreateTicketDTO } from '@meridio/contracts';
import { BuyTicketComponent, BuyTicketFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import React, { useCallback } from 'react';
import * as uuid from 'uuid';

export default function CreateTicket() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceId } = router.query;

  const onBuyTicket = useCallback(
    async (data: BuyTicketFormData) => {
      if (conferenceId && !loading) {
        const body: CreateTicketDTO = {
          id: uuid.v4(),
          conferenceId: conferenceId as string,
          assistantInfo: data,
        };
        await axios.post('http://localhost:3333/api/tickets', body, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });
        await router.push(`/conferences/${conferenceId}/tickets`);
      }
    },
    [conferenceId, loading, router, session?.accessToken]
  );

  return <BuyTicketComponent onBuyTicket={onBuyTicket} />;
}

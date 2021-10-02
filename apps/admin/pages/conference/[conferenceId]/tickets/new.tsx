import { CreateTicketDTO } from '@meridio/contracts';
import { BuyTicketComponent, BuyTicketFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import * as uuid from 'uuid';

export default async function CreateTicket() {
  const router = useRouter();
  const { conferenceId } = router.query;

  const onBuyTicket = useCallback(
    async (data: BuyTicketFormData) => {
      if (conferenceId) {
        const body: CreateTicketDTO = {
          id: uuid.v4(),
          conferenceId: conferenceId as string,
          assistantInfo: data,
        };
        await axios.post('http://localhost:3333/api/tickets', body);
        await router.push(`/tickets`);
      }
    },
    [conferenceId, router]
  );

  return <BuyTicketComponent onBuyTicket={onBuyTicket} />;
}

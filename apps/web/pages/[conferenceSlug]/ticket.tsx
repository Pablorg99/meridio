import { ConferenceDTO, CreateTicketDTO } from '@meridio/contracts';
import { BuyTicketComponent, BuyTicketFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import * as uuid from 'uuid';

export default async function BuyTicket() {
  const router = useRouter();
  const { conferenceSlug } = router.query;

  const { data: conference } = await axios.get<ConferenceDTO>(
    `http://localhost:3333/api/conferences/landings/${conferenceSlug}`
  );

  const onBuyTicket = useCallback(
    async (data: BuyTicketFormData) => {
      const body: CreateTicketDTO = {
        id: uuid.v4(),
        conferenceId: conference.id,
        assistantInfo: data,
      };
      await axios.post('http://localhost:3333/api/tickets', body);
      await router.push(`/${conferenceSlug}`);
    },
    [conference.id, conferenceSlug, router]
  );

  return <BuyTicketComponent onBuyTicket={onBuyTicket} />;
}

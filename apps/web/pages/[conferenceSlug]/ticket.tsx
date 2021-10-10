import { ConferenceDTO, CreateTicketDTO } from '@meridio/contracts';
import { BuyTicketComponent, BuyTicketFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useEffect, useState } from 'react';
import * as uuid from 'uuid';

export default function BuyTicket() {
  const router = useRouter();
  const { conferenceSlug } = router.query;

  const [conference, setConference] = useState<ConferenceDTO>();

  useEffect(() => {
    if (conferenceSlug) {
      axios.get<ConferenceDTO>(`http://localhost:3333/api/conferences/landings/${conferenceSlug}`).then((response) => {
        setConference(response.data);
      });
    }
  }, [conferenceSlug]);

  const onBuyTicket = useCallback(
    async (data: BuyTicketFormData) => {
      if (conference?.id) {
        const body: CreateTicketDTO = {
          id: uuid.v4(),
          conferenceId: conference.id,
          assistantInfo: data,
        };
        await axios.post('http://localhost:3333/api/tickets', body);
      }
    },
    [conference?.id, conferenceSlug, router]
  );

  return <BuyTicketComponent onBuyTicket={onBuyTicket} />;
}

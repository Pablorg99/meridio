import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';

import { LandingPage } from '../../components/LandingPage';

export default function ViewConference() {
  const router = useRouter();
  const { conferenceSlug } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conference, setConference] = useState<ConferenceDTO>();
  const navigateToBuyTicketPage = () => router.push(`/${conferenceSlug}/ticket`);

  const fetchLandingPage = useCallback(() => {
    if (conferenceSlug) {
      setIsFetching(true);
      axios
        .get(`http://localhost:3333/api/conferences/landings/${conferenceSlug}`)
        .then((response) => {
          setConference(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [conferenceSlug]);

  return (
    <LandingPage
      conference={conference}
      fetchLandingPage={fetchLandingPage}
      isFetching={isFetching}
      isError={isError}
      navigateToBuyTicketPage={navigateToBuyTicketPage}
    />
  );
}

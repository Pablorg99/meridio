import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { LandingPage } from '../../components/LandingPage';

export default function ViewConference() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceSlug } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conference, setConference] = useState<ConferenceDTO>();
  const navigateToBuyTicketPage = () => router.push(`/${conferenceSlug}/ticket`);
  const navigateToProposalsPage = () => router.push(`/${conferenceSlug}/proposals`);

  const fetchLandingPage = useCallback(() => {
    if (conferenceSlug && !loading) {
      setIsFetching(true);
      axios
        .get(`http://localhost:3333/api/conferences/landings/${conferenceSlug}`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setConference(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [conferenceSlug, loading, session?.accessToken]);

  return (
    <LandingPage
      conference={conference}
      fetchLandingPage={fetchLandingPage}
      isFetching={isFetching}
      isError={isError}
      navigateToBuyTicketPage={navigateToBuyTicketPage}
      navigateToProposalsPage={navigateToProposalsPage}
    />
  );
}

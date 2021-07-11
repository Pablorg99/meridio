import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';

import { LandingPage } from '../../components/LandingPage';

export default function ViewConference() {
  const router = useRouter();
  const { conferenceUrl } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conference, setConference] = useState<ConferenceDTO>();

  const fetchLandingPage = useCallback(() => {
    if (conferenceUrl) {
      setIsFetching(true);
      axios
        .get(`http://localhost:3333/api/conferences/landings/${conferenceUrl}`)
        .then((response) => {
          setConference(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [conferenceUrl]);

  return (
    <LandingPage
      conference={conference}
      fetchLandingPage={fetchLandingPage}
      isFetching={isFetching}
      isError={isError}
    />
  );
}

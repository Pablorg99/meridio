import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';

import { ViewConferenceComponent } from '../../../components/Conference/ViewConference';

export default function ViewConference() {
  const router = useRouter();
  const { conferenceId } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conference, setConference] = useState<ConferenceDTO>();

  const fetchConference = useCallback(() => {
    if (conferenceId) {
      setIsFetching(true);
      axios
        .get(`http://localhost:3333/api/conferences/${conferenceId}`)
        .then((response) => {
          setConference(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }, [conferenceId]);

  return (
    <ViewConferenceComponent
      conference={conference}
      fetchConference={fetchConference}
      isFetching={isFetching}
      isError={isError}
    />
  );
}

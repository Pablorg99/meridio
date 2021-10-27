import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { ViewConferenceComponent } from '../../../components/Conference/ViewConference';

export default function ViewConference() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceId } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conference, setConference] = useState<ConferenceDTO>();

  const fetchConference = useCallback(() => {
    if (conferenceId && !loading) {
      setIsFetching(true);
      axios
        .get(`http://localhost:3333/api/conferences/${conferenceId}`, {
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
  }, [conferenceId, loading, session?.accessToken]);

  return (
    <ViewConferenceComponent
      conference={conference}
      fetchConference={fetchConference}
      isFetching={isFetching}
      isError={isError}
    />
  );
}

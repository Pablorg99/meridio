import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { ConferencesList } from '../../components/Conference/ConferencesList';

export default function Conferences() {
  const [session, loading] = useSession();

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conferences, setConferences] = useState<Array<ConferenceDTO>>();

  const fetchConferences = useCallback(() => {
    if (!loading) {
      setIsFetching(true);
      axios
        .get<Array<ConferenceDTO>>(`http://localhost:3333/api/conferences`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setConferences(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
          setIsFetching(false);
        });
    }
  }, [loading, session?.accessToken]);

  return (
    <ConferencesList
      conferences={conferences}
      fetchConferences={fetchConferences}
      isFetching={isFetching}
      isError={isError}
    />
  );
}

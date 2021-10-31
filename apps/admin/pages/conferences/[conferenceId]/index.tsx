import { ConferenceDTO, EditConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { AppBar } from '../../../components/AppBar';
import { ConferenceFormData } from '../../../components/Conference/ConferenceForm';
import { EditConferenceComponent } from '../../../components/Conference/EditConference';

export default function EditConference() {
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

  const updateConference = useCallback(
    async (data: ConferenceFormData) => {
      if (conferenceId && !loading) {
        const body: EditConferenceDTO = { ...data };
        await axios.put(`http://localhost:3333/api/conferences/${conferenceId}`, body, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });
      }
    },
    [conferenceId, loading, session?.accessToken]
  );

  return (
    <AppBar session={session}>
      <EditConferenceComponent
        fetchConference={fetchConference}
        isFetching={isFetching}
        isError={isError}
        conference={conference}
        onEditConference={updateConference}
      />
    </AppBar>
  );
}

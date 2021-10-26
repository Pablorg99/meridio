import { ConferenceDTO, EditConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { ConferenceFormData } from '../../../components/Conference/ConferenceForm';
import { EditConferenceComponent } from '../../../components/Conference/EditConference';

export default function EditConference() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceId } = router.query;

  const [conference, setConference] = useState<ConferenceDTO>();

  const fetchConference = useCallback(() => {
    if (conferenceId && !loading) {
      axios
        .get(`http://localhost:3333/api/conferences/${conferenceId}`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setConference(response.data);
        })
        .catch((error) => {
          console.log('Request error:', error);
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
    <EditConferenceComponent
      onEditConference={updateConference}
      conference={conference}
      fetchConference={fetchConference}
    />
  );
}

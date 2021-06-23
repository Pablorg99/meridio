import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useState } from 'react';

import { EditConferenceComponent } from '../../../components/Conference/EditConference';

export default function EditConference() {
  const router = useRouter();
  const { conferenceId } = router.query;

  const [conference, setConference] = useState<ConferenceDTO>();

  const fetchConference = useCallback(() => {
    if (conferenceId) {
      axios
        .get(`http://localhost:3333/api/conferences/${conferenceId}`)
        .then((response) => {
          setConference(response.data);
        })
        .catch((error) => {
          console.log('Request error:', error);
        });
    }
  }, [conferenceId]);

  const updateConference = useCallback(async () => {
    await axios.put(`http://localhost:3333/api/conferences/${conferenceId}`, conference);
  }, [conference, conferenceId]);

  return (
    <EditConferenceComponent
      onEditConference={updateConference}
      conference={conference}
      fetchConference={fetchConference}
    />
  );
}

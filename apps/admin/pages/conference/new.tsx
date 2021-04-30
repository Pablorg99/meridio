import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';

import CreateConferenceComponent, { CreateConferenceForm } from '../../components/CreateConference';

export default function CreateConference() {
  const router = useRouter();

  const onCreateConference = useCallback(
    async (data: CreateConferenceForm) => {
      const conferenceId = await axios.post('http://localhost:3333/api/conference', data);
      router.push(`/conference/${conferenceId}`);
    },
    [router]
  );

  return <CreateConferenceComponent onCreateConference={onCreateConference} />;
}

import { CreateConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback } from 'react';
import * as uuid from 'uuid';

import { ConferenceFormData } from '../../components/Conference/ConferenceForm';
import { CreateConferenceComponent } from '../../components/Conference/CreateConference';

export default function CreateConference() {
  const router = useRouter();

  const onCreateConference = useCallback(
    async (data: ConferenceFormData) => {
      const body: CreateConferenceDTO = { id: uuid.v4(), ...data };
      await axios.post('http://localhost:3333/api/conferences', body);
      await router.push(`/conference/${body.id}`);
    },
    [router]
  );

  return <CreateConferenceComponent onCreateConference={onCreateConference} />;
}

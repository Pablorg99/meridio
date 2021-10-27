import { CreateConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import React, { useCallback } from 'react';
import * as uuid from 'uuid';

import { ConferenceFormData } from '../../components/Conference/ConferenceForm';
import { CreateConferenceComponent } from '../../components/Conference/CreateConference';

export default function CreateConference() {
  const [session, loading] = useSession();
  const router = useRouter();

  const onCreateConference = useCallback(
    async (data: ConferenceFormData) => {
      if (!loading) {
        const body: CreateConferenceDTO = { id: uuid.v4(), ...data };
        await axios.post('http://localhost:3333/api/conferences', body, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });
        await router.push(`/conferences/${body.id}`);
      }
    },
    [loading, router, session?.accessToken]
  );

  return <CreateConferenceComponent onCreateConference={onCreateConference} />;
}

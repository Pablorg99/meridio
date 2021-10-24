import { ConferenceDTO, CreateProposalDTO } from '@meridio/contracts';
import { AddProposal as AddProposalComponent, AddProposalFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useEffect, useState } from 'react';
import * as uuid from 'uuid';

export default function AddProposal() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceSlug } = router.query;

  const [conferenceId, setConferenceId] = useState('');

  useEffect(() => {
    if (conferenceSlug && !loading) {
      axios
        .get<ConferenceDTO>(`http://localhost:3333/api/conferences/landings/${conferenceSlug}`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setConferenceId(response.data.id);
        });
    }
  }, [conferenceSlug, loading, session?.accessToken]);

  const onAddProposal = useCallback(
    async (data: AddProposalFormData) => {
      if (conferenceId && !loading) {
        const { title, description, ...speakerInfo } = data;
        const body: CreateProposalDTO = {
          id: uuid.v4(),
          conferenceId: conferenceId,
          title,
          description,
          speakerInfo,
        };
        await axios.post('http://localhost:3333/api/proposals', body, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });
        await router.replace(`/${conferenceSlug}/proposals`);
      }
    },
    [conferenceId, conferenceSlug, loading, router, session?.accessToken]
  );

  return <AddProposalComponent onAddProposal={onAddProposal} />;
}

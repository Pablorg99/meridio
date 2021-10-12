import { ConferenceDTO, CreateProposalDTO } from '@meridio/contracts';
import { AddProposal as AddProposalComponent, AddProposalFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import * as uuid from 'uuid';

export default function AddProposal() {
  const router = useRouter();
  const { conferenceSlug } = router.query;

  const [conferenceId, setConferenceId] = useState('');

  useEffect(() => {
    if (conferenceSlug) {
      axios.get<ConferenceDTO>(`http://localhost:3333/api/conferences/landings/${conferenceSlug}`).then((response) => {
        setConferenceId(response.data.id);
      });
    }
  }, [conferenceSlug]);

  const onAddProposal = useCallback(
    async (data: AddProposalFormData) => {
      if (conferenceId) {
        const { title, description, ...speakerInfo } = data;
        const body: CreateProposalDTO = {
          id: uuid.v4(),
          conferenceId: conferenceId,
          title,
          description,
          speakerInfo,
        };
        await axios.post('http://localhost:3333/api/proposals', body);
        await router.replace(`/${conferenceSlug}/proposals`);
      }
    },
    [conferenceId, conferenceSlug, router]
  );

  return <AddProposalComponent onAddProposal={onAddProposal} />;
}

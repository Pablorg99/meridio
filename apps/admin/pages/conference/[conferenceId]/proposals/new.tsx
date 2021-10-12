import { CreateProposalDTO } from '@meridio/contracts';
import { AddProposal as AddProposalComponent, AddProposalFormData } from '@meridio/ui';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';
import * as uuid from 'uuid';

export default function AddProposal() {
  const router = useRouter();
  const { conferenceId } = router.query as { conferenceId: string };

  const onAddProposal = useCallback(
    async (data: AddProposalFormData) => {
      if (conferenceId) {
        const { title, description, ...speakerInfo } = data;
        const body: CreateProposalDTO = {
          id: uuid.v4(),
          conferenceId,
          title,
          description,
          speakerInfo,
        };
        await axios.post('http://localhost:3333/api/proposals', body);
        await router.replace(`/conference/${conferenceId}/proposals`);
      }
    },
    [conferenceId, router]
  );

  return <AddProposalComponent onAddProposal={onAddProposal} />;
}

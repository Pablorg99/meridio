import { ProposalDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { ProposalsList } from '../../../../components/Proposal/ProposalsList';

export default function Proposals() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceId } = router.query as { conferenceId: string };

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [proposals, setProposals] = useState<Array<ProposalDTO>>();
  const navigateToAddProposalPage = () => router.push(`/${conferenceId}/proposals/new`);

  const fetchProposals = useCallback(() => {
    if (conferenceId && !loading) {
      setIsFetching(true);
      axios
        .get<Array<ProposalDTO>>(`http://localhost:3333/api/proposals/${conferenceId}`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setProposals(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
          setIsFetching(false);
        });
    }
  }, [conferenceId, loading, session?.accessToken]);

  return (
    <ProposalsList
      proposals={proposals}
      fetchProposals={fetchProposals}
      isFetching={isFetching}
      isError={isError}
      navigateToAddProposalPage={navigateToAddProposalPage}
    />
  );
}

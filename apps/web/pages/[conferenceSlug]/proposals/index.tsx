import { ConferenceDTO, ProposalDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useEffect, useState } from 'react';

import { ProposalsPage } from '../../../components/ProposalsPage';

export default function Proposals() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { conferenceSlug } = router.query;

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conferenceId, setConferenceId] = useState('');
  const [proposals, setProposals] = useState<Array<ProposalDTO>>();
  const navigateToAddProposalPage = () => router.push(`/${conferenceSlug}/proposals/new`);

  useEffect(() => {
    if (conferenceSlug && !loading) {
      setIsFetching(true);
      axios
        .get<ConferenceDTO>(`http://localhost:3333/api/conferences/landings/${conferenceSlug}`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setConferenceId(response.data.id);
        });
    }
  }, [conferenceSlug, loading, session?.accessToken]);

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
    <ProposalsPage
      navigateToAddProposalPage={navigateToAddProposalPage}
      fetchProposals={fetchProposals}
      proposals={proposals}
      isFetching={isFetching}
      isError={isError}
    />
  );
}

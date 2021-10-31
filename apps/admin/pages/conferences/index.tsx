import { ConferenceDTO } from '@meridio/contracts';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

import { AppBar } from '../../components/AppBar';
import { ConferencesList } from '../../components/Conference/ConferencesList';

export default function Conferences() {
  const [session, loading] = useSession();

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conferences, setConferences] = useState<Array<ConferenceDTO>>();

  const router = useRouter();
  const navigateToConferencePage = (conferenceId: string) => router.push(`/conferences/${conferenceId}`);
  const navigateToLandingPage = (conferenceSlug: string) =>
    window.open(`http://localhost:4200/${conferenceSlug}`, '_ blank');
  const navigateToProposalsPage = (conferenceId: string) => router.push(`/conferences/${conferenceId}/proposals`);
  const navigateToTicketsPage = (conferenceId: string) => router.push(`/conferences/${conferenceId}/tickets`);
  const navigateToCreateConferencePage = () => router.push('/conferences/new');

  const fetchConferences = useCallback(() => {
    if (!loading) {
      setIsFetching(true);
      axios
        .get<Array<ConferenceDTO>>(`http://localhost:3333/api/conferences`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        })
        .then((response) => {
          setConferences(response.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsError(true);
          setIsFetching(false);
        });
    }
  }, [loading, session?.accessToken]);

  return (
    <AppBar session={session}>
      <ConferencesList
        conferences={conferences}
        fetchConferences={fetchConferences}
        isFetching={isFetching}
        isError={isError}
        navigateToConferencePage={navigateToConferencePage}
        navigateToLandingPage={navigateToLandingPage}
        navigateToProposalsPage={navigateToProposalsPage}
        navigateToTicketsPage={navigateToTicketsPage}
        navigateToCreateConferencePage={navigateToCreateConferencePage}
      />
    </AppBar>
  );
}

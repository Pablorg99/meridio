import { ProposalsList } from '@meridio/ui';
import { useRouter } from 'next/dist/client/router';

export default function Proposals() {
  const router = useRouter();
  const { conferenceId } = router.query as { conferenceId: string };
  const navigateToAddProposalPage = () => router.push(`/${conferenceId}/proposals/new`);

  return <ProposalsList navigateToAddProposalPage={navigateToAddProposalPage} />;
}

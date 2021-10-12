import { ProposalsList } from '@meridio/ui';
import { useRouter } from 'next/dist/client/router';

export default function Proposals() {
  const router = useRouter();
  const { conferenceSlug } = router.query;
  const navigateToAddProposalPage = () => router.push(`/${conferenceSlug}/proposals/new`);

  return <ProposalsList navigateToAddProposalPage={navigateToAddProposalPage} />;
}

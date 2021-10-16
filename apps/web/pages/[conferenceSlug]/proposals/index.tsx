import { useRouter } from 'next/dist/client/router';

import { ProposalsPage } from '../../../components/ProposalsPage';

export default function Proposals() {
  const router = useRouter();
  const { conferenceSlug } = router.query;
  const navigateToAddProposalPage = () => router.push(`/${conferenceSlug}/proposals/new`);

  return <ProposalsPage navigateToAddProposalPage={navigateToAddProposalPage} />;
}

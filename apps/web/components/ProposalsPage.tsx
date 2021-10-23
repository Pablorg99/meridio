import { ProposalDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

import { ProposalItem } from './ProposalItem';

type Props = {
  proposals?: Array<ProposalDTO>;
  fetchProposals(): void;
  isFetching: boolean;
  isError: boolean;
  navigateToAddProposalPage(): void;
};

export const ProposalsPage: React.FunctionComponent<Props> = ({
  proposals,
  isFetching,
  isError,
  fetchProposals,
  navigateToAddProposalPage,
}) => {
  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  if (isFetching) {
    return <div data-testid="loading-icon">Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (proposals) {
    return (
      <div>
        <ul>
          {proposals.map((proposal) => (
            <ProposalItem key={proposal.id} proposal={proposal} />
          ))}
        </ul>
        <button onClick={navigateToAddProposalPage}>Añadir propuesta</button>
      </div>
    );
  }

  return null;
};

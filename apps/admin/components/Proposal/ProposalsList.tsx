import { ProposalDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

import { ProposalRow } from './ProposalRow';

type Props = {
  proposals?: Array<ProposalDTO>;
  fetchProposals(): void;
  isFetching: boolean;
  isError: boolean;
  navigateToAddProposalPage(): void;
};

export const ProposalsList: React.FunctionComponent<Props> = ({
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
        <table>
          <tbody>
            <tr>
              <th>Título</th>
              <th>Nombre del ponente</th>
            </tr>
            {proposals.map((proposal) => (
              <ProposalRow proposal={proposal} key={proposal.id} />
            ))}
          </tbody>
        </table>
        <button onClick={navigateToAddProposalPage}>Añadir propuesta</button>
      </div>
    );
  }

  return null;
};

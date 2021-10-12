import React from 'react';

type Props = {
  navigateToAddProposalPage(): void;
};

export const ProposalsList: React.FunctionComponent<Props> = ({ navigateToAddProposalPage }) => (
  <button onClick={navigateToAddProposalPage}>Añadir propuesta</button>
);

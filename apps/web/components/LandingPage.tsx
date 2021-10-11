import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  conference?: ConferenceDTO;
  fetchLandingPage(): void;
  isError: boolean;
  isFetching: boolean;
  navigateToBuyTicketPage(): void;
  navigateToProposalsPage(): void;
};

export const LandingPage: React.FunctionComponent<Props> = ({
  conference,
  fetchLandingPage,
  isError,
  isFetching,
  navigateToBuyTicketPage,
  navigateToProposalsPage,
}) => {
  useEffect(() => {
    fetchLandingPage();
  }, [fetchLandingPage]);

  if (isFetching) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <>
      <div>{conference?.name}</div>
      <div>{conference?.place}</div>
      <div>{conference?.slug}</div>
      <div>{conference?.startDate}</div>
      <div>{conference?.endDate}</div>
      {conference?.isTicketSalesOpen && <button onClick={navigateToBuyTicketPage}>Adquirir entrada</button>}
      {conference?.isCallForPapersOpen && <button onClick={navigateToProposalsPage}>Proponer una charla</button>}
    </>
  );
};

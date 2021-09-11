import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  conference?: ConferenceDTO;
  fetchLandingPage(): void;
  isError: boolean;
  isFetching: boolean;
  navigateToBuyTicketPage(): void;
};

export const LandingPage: React.FunctionComponent<Props> = ({
  conference,
  fetchLandingPage,
  isError,
  isFetching,
  navigateToBuyTicketPage,
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
      <button onClick={navigateToBuyTicketPage}>Adquirir entrada</button>
    </>
  );
};

import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  conference?: ConferenceDTO;
  fetchConference(): void;
  isFetching: boolean;
  isError: boolean;
};

export const ViewConferenceComponent: React.FunctionComponent<Props> = ({
  conference,
  fetchConference,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchConference();
  }, [fetchConference]);

  if (isFetching) {
    return <div data-testid="loading-icon">Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (conference) {
    return (
      <>
        <div>{conference.name}</div>
        <div>{conference.place}</div>
        <div>{conference.slug}</div>
        <div>{conference.startDate}</div>
        <div>{conference.endDate}</div>
      </>
    );
  }

  return null;
};

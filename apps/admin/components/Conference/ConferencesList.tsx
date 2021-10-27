import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  conferences?: Array<ConferenceDTO>;
  fetchConferences(): void;
  isFetching: boolean;
  isError: boolean;
};

export const ConferencesList: React.FunctionComponent<Props> = ({
  conferences,
  fetchConferences,
  isFetching,
  isError,
}) => {
  useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

  if (isError) {
    return <span>Error</span>;
  }

  if (isFetching) {
    return <span data-testid="loading-icon">Loading...</span>;
  }

  if (conferences) {
    return (
      <ul>
        {conferences.map((conference) => (
          <li key={conference.id}>{conference.name}</li>
        ))}
      </ul>
    );
  }

  return null;
};

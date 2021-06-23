import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

import { ConferenceForm, ConferenceFormData } from './ConferenceForm';

type Props = {
  conference?: ConferenceDTO;
  fetchConference: () => void;
  onEditConference: (data: ConferenceFormData) => void;
};

export const EditConferenceComponent: React.FunctionComponent<Props> = ({
  conference,
  fetchConference,
  onEditConference,
}) => {
  useEffect(() => {
    fetchConference();
  }, [fetchConference]);

  if (!conference) {
    return null;
  }

  return <ConferenceForm onSubmit={onEditConference} conference={conference} />;
};

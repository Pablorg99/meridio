import { ConferenceDTO } from '@meridio/contracts';
import React from 'react';

import { ConferenceForm, ConferenceFormData } from './ConferenceForm';

type Props = {
  onEditConference: (data: ConferenceFormData) => void;
  conference: ConferenceDTO;
};

export const EditConference: React.FunctionComponent<Props> = ({ onEditConference, conference }) => (
  <ConferenceForm onSubmit={onEditConference} conference={conference} />
);

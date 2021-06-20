import React from 'react';

import { ConferenceForm, ConferenceFormData } from './ConferenceForm';

type Props = {
  onEditConference: (data: ConferenceFormData) => void;
};

export const EditConference: React.FunctionComponent<Props> = ({ onEditConference }) => (
  <ConferenceForm onSubmit={onEditConference} />
);

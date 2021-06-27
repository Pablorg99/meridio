import React from 'react';

import { ConferenceForm, ConferenceFormData } from './ConferenceForm';

type Props = {
  onCreateConference: (data: ConferenceFormData) => void;
};

export const CreateConferenceComponent: React.FunctionComponent<Props> = ({ onCreateConference }) => (
  <ConferenceForm onSubmit={onCreateConference} />
);

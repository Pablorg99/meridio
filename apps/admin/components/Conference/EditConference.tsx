import { WarningIcon } from '@chakra-ui/icons';
import { Container, Spinner, Text } from '@chakra-ui/react';
import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

import { ConferenceForm, ConferenceFormData } from './ConferenceForm';

type Props = {
  fetchConference(): void;
  isFetching: boolean;
  isError: boolean;
  conference?: ConferenceDTO;
  onEditConference: (data: ConferenceFormData) => void;
};

export const EditConferenceComponent: React.FunctionComponent<Props> = ({
  fetchConference,
  isFetching,
  isError,
  conference,
  onEditConference,
}) => {
  useEffect(() => {
    fetchConference();
  }, [fetchConference]);

  if (isFetching) {
    return (
      <Container display="flex" justifyContent="center" marginTop="5%">
        <Spinner data-testid="loading-icon" size="xl" thickness="5px" color="orange" emptyColor="orange.100" />;
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="100%" display="flex" justifyContent="center" alignItems="center" marginTop="5%">
        <WarningIcon w={8} h={8} color="red" marginRight="10px" />
        <Text fontSize="4xl" color="red">
          There was an unexpected error, try reloading the page.
        </Text>
      </Container>
    );
  }

  if (conference) {
    return <ConferenceForm onSubmit={onEditConference} conference={conference} />;
  }

  return null;
};

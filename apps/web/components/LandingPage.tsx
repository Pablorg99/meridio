import { WarningIcon } from '@chakra-ui/icons';
import { Button, Container, Flex, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

import { ConferenceDate } from './ConferenceDate';

export type Props = {
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
    return (
      <Container display="flex" justifyContent="center" marginTop="50px">
        <Spinner data-testid="loading-icon" size="xl" thickness="5px" color="orange" emptyColor="orange.100" />;
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="100%" display="flex" justifyContent="center" alignItems="center" marginTop="50px">
        <WarningIcon w={8} h={8} color="red" marginRight="10px" />
        <Text fontSize="4xl" color="red">
          There was an unexpected error, try reloading the page.
        </Text>
        lk
      </Container>
    );
  }

  if (conference) {
    return (
      <>
        <VStack marginTop={'50px'} spacing={'50px'}>
          <Heading size={'4xl'}>{conference.name}</Heading>
          <HStack spacing={'30px'}>
            <Heading>{conference.place}</Heading>
            <ConferenceDate startDate={new Date(conference.startDate)} endDate={new Date(conference.endDate)} />
          </HStack>
          {conference.isTicketSalesOpen && (
            <Button colorScheme={'orange'} size={'lg'} onClick={navigateToBuyTicketPage}>
              Adquirir entrada
            </Button>
          )}
        </VStack>
        <VStack marginTop={'150px'} spacing={'50px'}>
          <Heading size={'2xl'}>Ponencias</Heading>
          <HStack width={'100%'} justifyContent={'center'} spacing={'10%'}>
            <Heading>Próximamente...</Heading>
            {conference.isCallForPapersOpen && (
              <Button colorScheme={'orange'} onClick={navigateToProposalsPage}>
                Proponer una charla
              </Button>
            )}
          </HStack>
        </VStack>
      </>
    );
  }

  return null;
};

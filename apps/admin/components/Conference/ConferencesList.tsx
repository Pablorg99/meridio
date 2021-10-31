import { ExternalLinkIcon, WarningIcon } from '@chakra-ui/icons';
import { Button, Container, Link, Spinner, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  conferences?: Array<ConferenceDTO>;
  fetchConferences(): void;
  isFetching: boolean;
  isError: boolean;
  navigateToConferencePage(conferenceId: string): void;
  navigateToLandingPage(conferenceSlug: string): void;
  navigateToProposalsPage(conferenceId: string): void;
  navigateToTicketsPage(conferenceId: string): void;
  navigateToCreateConferencePage(): void;
};

export const ConferencesList: React.FunctionComponent<Props> = ({
  conferences,
  fetchConferences,
  isFetching,
  isError,
  navigateToConferencePage,
  navigateToLandingPage,
  navigateToProposalsPage,
  navigateToTicketsPage,
  navigateToCreateConferencePage,
}) => {
  useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

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
      </Container>
    );
  }

  if (conferences) {
    return (
      <Container maxWidth="75%" marginTop="50px">
        <Table>
          <Tbody>
            {conferences.map((conference) => (
              <Tr key={conference.id}>
                <Td>
                  <Link color={'#0645AD'} onClick={() => navigateToConferencePage(conference.id)}>
                    {conference.name}
                  </Link>
                </Td>
                <Td>
                  <Link onClick={() => navigateToLandingPage(conference.slug)}>
                    {conference.slug}
                    <ExternalLinkIcon marginLeft={'10px'} marginBottom={'5px'} />
                  </Link>
                </Td>
                <Td>
                  <Button
                    colorScheme={'orange'}
                    variant={'solid'}
                    onClick={() => navigateToProposalsPage(conference.id)}
                  >
                    Ver charlas
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme={'orange'} variant={'solid'} onClick={() => navigateToTicketsPage(conference.id)}>
                    Ver entradas
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button marginTop={'45px'} colorScheme={'orange'} variant={'solid'} onClick={navigateToCreateConferencePage}>
          Crear conferencia
        </Button>
      </Container>
    );
  }

  return null;
};

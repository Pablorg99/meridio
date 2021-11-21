import { WarningIcon } from '@chakra-ui/icons';
import { Button, Container, Heading, HStack, Spinner, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { ProposalDTO } from '@meridio/contracts';
import { Head } from 'next/document';
import React, { useEffect } from 'react';

import { ProposalItem } from './ProposalItem';

type Props = {
  proposals?: Array<ProposalDTO>;
  fetchProposals(): void;
  isFetching: boolean;
  isError: boolean;
  navigateToAddProposalPage(): void;
  navigateToLandingPage(): void;
};

export const ProposalsPage: React.FunctionComponent<Props> = ({
  proposals,
  isFetching,
  isError,
  fetchProposals,
  navigateToAddProposalPage,
  navigateToLandingPage,
}) => {
  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

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

  if (proposals) {
    return (
      <Container maxWidth="75%" marginTop="50px">
        <Heading>Tus propuestas</Heading>
        <Table marginTop={'50px'} variant="simple">
          <Thead>
            <Tr>
              <Th>Título de la charla</Th>
              <Th>Descripción de la charla</Th>
            </Tr>
          </Thead>
          <Tbody>
            {proposals.map((proposal) => (
              <ProposalItem proposal={proposal} key={proposal.id} />
            ))}
          </Tbody>
        </Table>
        <HStack marginTop={'50px'} spacing={'auto'}>
          <Button onClick={navigateToAddProposalPage}>Añadir propuesta</Button>
          <Button onClick={navigateToLandingPage}>Volver a la página de la conferencia</Button>
        </HStack>
      </Container>
    );
  }

  return null;
};

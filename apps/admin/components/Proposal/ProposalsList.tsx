import { WarningIcon } from '@chakra-ui/icons';
import { Button, Container, Spinner, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { ProposalDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

import { ProposalRow } from './ProposalRow';

type Props = {
  proposals?: Array<ProposalDTO>;
  fetchProposals(): void;
  isFetching: boolean;
  isError: boolean;
  navigateToAddProposalPage(): void;
};

export const ProposalsList: React.FunctionComponent<Props> = ({
  proposals,
  isFetching,
  isError,
  fetchProposals,
  navigateToAddProposalPage,
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
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Título de la charla</Th>
              <Th>Nombre del ponente</Th>
              <Th>Email del ponente</Th>
              <Th>Descripción de la charla</Th>
            </Tr>
          </Thead>
          <Tbody>
            {proposals.map((proposal) => (
              <ProposalRow proposal={proposal} key={proposal.id} />
            ))}
          </Tbody>
        </Table>
        <Button marginTop="50px" colorScheme="orange" variant="solid" onClick={navigateToAddProposalPage}>
          Añadir propuesta
        </Button>
      </Container>
    );
  }

  return null;
};

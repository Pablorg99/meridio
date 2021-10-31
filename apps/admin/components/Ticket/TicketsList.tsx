import { WarningIcon } from '@chakra-ui/icons';
import { Button, Container, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { TicketDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  tickets?: Array<TicketDTO>;
  fetchTickets(): void;
  isFetching: boolean;
  isError: boolean;
  navigateToAddTicketPage(): void;
};

export const TicketsList: React.FunctionComponent<Props> = ({
  tickets,
  fetchTickets,
  isFetching,
  isError,
  navigateToAddTicketPage,
}) => {
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

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

  if (tickets) {
    return (
      <Container maxWidth="75%" marginTop="50px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre completo</Th>
              <Th>Email</Th>
              <Th>País</Th>
              <Th>Ciudad</Th>
              <Th>Género</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tickets.map((ticket) => (
              <Tr key={ticket.id}>
                <Td>{ticket.assistantInfo.fullName}</Td>
                <Td>{ticket.assistantInfo.email}</Td>
                <Td>{ticket.assistantInfo.country}</Td>
                <Td>{ticket.assistantInfo.city}</Td>
                <Td>{ticket.assistantInfo.gender}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button marginTop="50px" colorScheme="orange" variant="solid" onClick={navigateToAddTicketPage}>
          Añadir ticket
        </Button>
      </Container>
    );
  }

  return null;
};

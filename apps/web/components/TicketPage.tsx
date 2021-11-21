import { Button, Container, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { TicketDTO } from '@meridio/contracts';
import { BuyTicketComponent, BuyTicketFormData } from '@meridio/ui';
import React, { useEffect } from 'react';

type Props = {
  fetchTicket(): void;
  ticket?: TicketDTO;
  onBuyTicket(data: BuyTicketFormData): void;
  isFetching: boolean;
  navigateToLandingPage(): void;
};

export const TicketPage: React.FunctionComponent<Props> = ({
  fetchTicket,
  ticket,
  onBuyTicket,
  isFetching,
  navigateToLandingPage,
}) => {
  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  if (isFetching) {
    return (
      <Container display="flex" justifyContent="center" marginTop="50px">
        <Spinner data-testid="loading-icon" size="xl" thickness="5px" color="orange" emptyColor="orange.100" />;
      </Container>
    );
  }

  if (ticket) {
    return (
      <Container maxWidth={'75%'} marginTop={'100px'}>
        <VStack spacing={'20px'} alignItems={'left'}>
          <Heading>Ya tienes una entrada para el evento con los siguientes datos:</Heading>
          <Text fontSize={'2xl'}>
            <strong>Nombre:</strong> {ticket.assistantInfo.fullName}
          </Text>
          <Text fontSize={'2xl'}>
            {' '}
            <strong> Correo electrónico:</strong> {ticket.assistantInfo.email}
          </Text>
        </VStack>
          <Button onClick={navigateToLandingPage} colorScheme={'orange'} marginTop={'50px'}>
            Volver a la página de la conferencia
          </Button>
      </Container>
    );
  }

  return <BuyTicketComponent onBuyTicket={onBuyTicket} />;
};

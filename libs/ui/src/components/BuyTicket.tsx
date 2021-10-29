import { Button, Container, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

export type BuyTicketFormData = {
  fullName: string;
  email: string;
  age?: number;
  country?: string;
  city?: string;
  gender?: string;
};

type Props = {
  onBuyTicket(data: BuyTicketFormData): void;
};

export const BuyTicketComponent: React.FunctionComponent<Props> = ({ onBuyTicket }) => {
  const { handleSubmit, register } = useForm<BuyTicketFormData>();

  return (
    <form aria-label="buy-ticket-form" onSubmit={handleSubmit((data) => onBuyTicket(data))}>
      <Container maxWidth={'75%'} marginTop={'5%'}>
        <FormControl display={'flex'} justifyContent={'space-between'}>
          <FormControl marginTop="25px" width={'48%'} isRequired>
            <FormLabel>Nombre completo</FormLabel>
            <Input {...register('fullName', { required: true })} type="text" />
          </FormControl>
          <FormControl marginTop="25px" width={'48%'} isRequired>
            <FormLabel>Email</FormLabel>
            <Input {...register('email', { required: true })} type="text" />
          </FormControl>
        </FormControl>
        <FormControl display={'flex'} justifyContent={'space-between'}>
          <FormControl marginTop="25px" width={'48%'}>
            <FormLabel>Edad</FormLabel>
            <Input {...register('age')} type="text" />
          </FormControl>
          <FormControl marginTop="25px" width={'48%'}>
            <FormLabel>País</FormLabel>
            <Input {...register('country')} type="text" />
          </FormControl>
        </FormControl>
        <FormControl display={'flex'} justifyContent={'space-between'}>
          <FormControl marginTop="25px" width={'48%'}>
            <FormLabel>Ciudad</FormLabel>
            <Input {...register('city')} type="text" />
          </FormControl>
          <FormControl marginTop="25px" width={'48%'}>
            <FormLabel>Género</FormLabel>
            <Input {...register('gender')} type="text" />
          </FormControl>
        </FormControl>
        <Button type="submit" marginTop="45px" colorScheme={'orange'} variant={'solid'}>
          Adquirir entrada
        </Button>
      </Container>
    </form>
  );
};

import { Button, Container, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

export type AddProposalFormData = {
  title: string;
  description: string;
  fullName: string;
  email: string;
  age?: number;
  country?: string;
  city?: string;
  gender?: string;
};

type Props = {
  onAddProposal(data: AddProposalFormData): void;
};

export const AddProposal: React.FunctionComponent<Props> = ({ onAddProposal }) => {
  const { register, handleSubmit } = useForm<AddProposalFormData>();

  return (
    <form aria-label="add-proposal-form" onSubmit={handleSubmit((data) => onAddProposal(data))}>
      <Container maxWidth="75%" marginTop="50px">
        <FormControl paddingTop="25px" isRequired>
          <FormLabel>Título de la charla</FormLabel>
          <Input {...register('title', { required: true })} type="text" />
        </FormControl>
        <FormControl paddingTop="25px" isRequired>
          <FormLabel>Descripción de la charla</FormLabel>
          <Textarea {...register('description', { required: true })} />
        </FormControl>
        <FormControl paddingTop="25px" display={'flex'} justifyContent={'space-between'}>
          <FormControl width="48%" isRequired>
            <FormLabel>Tu nombre completo</FormLabel>
            <Input {...register('fullName', { required: true })} type="text" />
          </FormControl>
          <FormControl width="48%" isRequired>
            <FormLabel>Tu email de contacto</FormLabel>
            <Input {...register('email', { required: true })} type="text" />
          </FormControl>
        </FormControl>
        <Button type="submit" width="20%" marginTop="45px" variant="solid">
          Proponer charla
        </Button>
      </Container>
    </form>
  );
};

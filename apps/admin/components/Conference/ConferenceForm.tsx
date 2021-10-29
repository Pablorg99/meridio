import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Switch } from '@chakra-ui/react';
import { ConferenceDTO } from '@meridio/contracts';
import React from 'react';
import { useForm } from 'react-hook-form';

export type ConferenceFormData = {
  name: string;
  slug: string;
  place: string;
  startDate: string;
  endDate: string;
  isLandingPageOpen: boolean;
  isCallForPapersOpen: boolean;
  isTicketSalesOpen: boolean;
};

type Props = {
  onSubmit(data: ConferenceFormData): void;
  conference?: ConferenceDTO;
};

export const  ConferenceForm: React.FunctionComponent<Props> = ({ onSubmit, conference }) => {
  const { handleSubmit, register } = useForm<ConferenceFormData>();

  return (
    <form aria-label="conference-form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <FormControl display="flex" flexDirection="column" width="100%" justifyContent="center" padding="5% 25%">
        <FormControl isRequired>
          <FormControl display="flex" justifyContent="space-between">
            <FormControl width="48%" isRequired>
              <FormLabel paddingTop="25px"> Nombre de la conferencia</FormLabel>
              <Input {...register('name', { required: true })} defaultValue={conference?.name} />
            </FormControl>
            <FormControl width="48%" isRequired>
              <FormLabel paddingTop="25px">Enlance a la página de conferencia</FormLabel>
              <InputGroup>
                <InputLeftAddon children="https://meridio.com/" />
                <Input {...register('slug', { required: true })} type="text" defaultValue={conference?.slug} />
              </InputGroup>
            </FormControl>
          </FormControl>
          <FormLabel paddingTop="25px">Lugar de celebración </FormLabel>
          <Input {...register('place', { required: true })} type="text" defaultValue={conference?.place} />
          <FormControl paddingTop="25px" display="flex" justifyContent="space-between">
            <FormControl width="48%">
              <FormLabel>Fecha de inicio </FormLabel>
              <Input {...register('startDate', { required: true })} type="date" defaultValue={conference?.startDate} />
            </FormControl>
            <FormControl width="48%">
              <FormLabel>Fecha de fin </FormLabel>
              <Input {...register('endDate', { required: true })} type="date" defaultValue={conference?.endDate} />
            </FormControl>
          </FormControl>
        </FormControl>
        <FormControl paddingTop="25px" display="flex" justifyContent="space-between">
          <FormControl display="flex" alignItems="center" width="auto">
            <FormLabel htmlFor="landing-page" marginBottom="3px">
              Abrir página de conferencia{' '}
            </FormLabel>
            <Switch
              id="landing-page"
              colorScheme="orange"
              {...register('isLandingPageOpen')}
              type="checkbox"
              defaultChecked={conference?.isLandingPageOpen}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center" width="auto">
            <FormLabel htmlFor="cfp" marginBottom="3px">
              Abrir call for papers{' '}
            </FormLabel>
            <Switch
              id="cfp"
              colorScheme="orange"
              {...register('isCallForPapersOpen')}
              type="checkbox"
              defaultChecked={conference?.isCallForPapersOpen}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center" width="auto">
            <FormLabel htmlFor="ticket-sales" marginBottom="3px">
              Abrir venta de tickets{' '}
            </FormLabel>
            <Switch
              id="ticket-sales"
              colorScheme="orange"
              {...register('isTicketSalesOpen')}
              type="checkbox"
              defaultChecked={conference?.isTicketSalesOpen}
            />
          </FormControl>
        </FormControl>
        <Button type="submit" width="20%" marginTop="25px" colorScheme="orange" variant="solid">
          {conference ? 'Guardar cambios' : 'Crear conferencia'}
        </Button>
      </FormControl>
    </form>
  );
};

import { ConferenceDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export type ConferenceFormData = {
  name: string;
  url: string;
  place: string;
  startDate: string;
  endDate: string;
  logoFile?: FileList;
};

type Props = {
  onSubmit(data: ConferenceFormData): void;
  conference?: ConferenceDTO;
};

export const ConferenceForm: React.FunctionComponent<Props> = ({ onSubmit, conference }) => {
  const { handleSubmit, register, setValue } = useForm<ConferenceFormData>();

  return (
    <form aria-label="conference-form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <label>
        Nombre de la conferencia{' '}
        <input {...register('name', { required: true })} type="text" defaultValue={conference?.name} />
      </label>
      <label>
        Enlace para la página principal{' '}
        <input {...register('url', { required: true })} type="text" defaultValue={conference?.url} />
      </label>
      <label>
        Lugar de celebración{' '}
        <input {...register('place', { required: true })} type="text" defaultValue={conference?.place} />
      </label>
      <label>
        Fecha de inicio{' '}
        <input {...register('startDate', { required: true })} type="date" defaultValue={conference?.startDate} />
      </label>
      <label>
        Fecha de fin{' '}
        <input {...register('endDate', { required: true })} type="date" defaultValue={conference?.endDate} />
      </label>
      <label>
        Logo de conferencia <input {...register('logoFile')} type="file" />
      </label>
      <input type="submit" value="Crear conferencia" />
    </form>
  );
};
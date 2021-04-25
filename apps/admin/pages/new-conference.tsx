import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onCreateConference: () => Promise<void>;
};

type FormValues = {
  name: string;
  url: string;
  place: string;
  startDate: Date;
  endDate: Date;
  logoFile: FileList;
};

const CreateConference: React.FunctionComponent<Props> = ({ onCreateConference }) => {
  const { handleSubmit, register } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onCreateConference)}>
      <label>
        Nombre de la conferencia <input {...register('name', { required: true })} type="text" />
      </label>
      <label>
        Enlace para la página principal <input {...register('url', { required: true })} type="text" />
      </label>
      <label>
        Lugar de celebración <input {...register('place')} type="text" />
      </label>
      <label>
        Fecha de inicio <input {...register('startDate')} type="date" />
      </label>
      <label>
        Fecha de fin <input {...register('endDate')} type="date" />
      </label>
      <label>
        Logo de conferencia <input {...register('logoFile')} type="file" />
      </label>
      <input type="submit" value="Crear conferencia" />
    </form>
  );
};

export default CreateConference;

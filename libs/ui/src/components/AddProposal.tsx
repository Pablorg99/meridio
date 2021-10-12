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
      <label>
        Título <input {...register('title', { required: true })} type="text" />
      </label>
      <label>
        Descripción <textarea {...register('description', { required: true })} />
      </label>
      <label>
        Nombre completo <input {...register('fullName', { required: true })} type="text" />
      </label>
      <label>
        Email <input {...register('email', { required: true })} type="text" />
      </label>
      <label>
        Edad <input {...register('age')} type="text" />
      </label>
      <label>
        País <input {...register('country')} type="text" />
      </label>
      <label>
        Ciudad <input {...register('city')} type="text" />
      </label>
      <label>
        Género <input {...register('gender')} type="text" />
      </label>
      <input type="submit" value="Proponer charla" />
    </form>
  );
};

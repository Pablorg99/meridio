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
      <input type="submit" value="Adquirir entrada" />
    </form>
  );
};

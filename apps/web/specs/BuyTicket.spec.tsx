import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';

import { BuyTicketComponent } from '../components/BuyTicket';

describe('BuyTicket', () => {
  const defaultProps = {
    onBuyTicket: () => {},
  };

  describe('layout', () => {
    it('should show a form with the fields to buy a ticket', function () {
      render(<BuyTicketComponent {...defaultProps} />);

      expect(screen.getByRole('textbox', { name: 'Nombre completo' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Edad' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'País' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Ciudad' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Género' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Adquirir entrada' })).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    it('should call onBuyTicket when submit button is clicked and the mandatory fields are filled', async function () {
      const props = {
        ...defaultProps,
        onBuyTicket: jest.fn(),
      };
      render(<BuyTicketComponent {...props} />);

      const fullNameInput = screen.getByRole('textbox', { name: 'Nombre completo' });
      const emailInput = screen.getByRole('textbox', { name: 'Email' });
      const submitButton = screen.getByRole('button', { name: 'Adquirir entrada' });
      userEvent.type(fullNameInput, faker.random.word());
      userEvent.type(emailInput, faker.random.word());
      userEvent.click(submitButton);

      await waitFor(() => expect(props.onBuyTicket).toHaveBeenCalledTimes(1));
    });

    it('should not call onBuyTicket when the submit button is clicked and any mandatory field is not filled', async function () {
      const props = {
        ...defaultProps,
        onBuyTicket: jest.fn(),
      };
      render(<BuyTicketComponent {...props} />);

      const submitButton = screen.getByRole('button', { name: 'Adquirir entrada' });
      userEvent.click(submitButton);

      await waitFor(() => {});
      expect(props.onBuyTicket).not.toHaveBeenCalled();
    });
  });
});

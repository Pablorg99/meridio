import '@testing-library/jest-dom';

import { AddProposal } from '@meridio/ui';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';

describe('Add proposal', function () {
  const defaultProps = {
    onAddProposal: () => {},
  };

  describe('layout', function () {
    it('should show a form with the right fields and a button to add the proposal', function () {
      render(<AddProposal {...defaultProps} />);

      expect(screen.queryByRole('form')).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Título' })).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Descripción' })).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Nombre completo' })).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Email' })).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Edad' })).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'País' })).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Ciudad' })).toBeInTheDocument();
      expect(screen.queryByRole('textbox', { name: 'Género' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Proponer charla' })).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    it('should call onAddProposal when submit button is clicked and the mandatory fields are filled', async function () {
      const props = {
        ...defaultProps,
        onAddProposal: jest.fn(),
      };
      render(<AddProposal {...props} />);

      const titleInput = screen.getByRole('textbox', { name: 'Título' });
      const descriptionInput = screen.getByRole('textbox', { name: 'Descripción' });
      const fullNameInput = screen.getByRole('textbox', { name: 'Nombre completo' });
      const emailInput = screen.getByRole('textbox', { name: 'Email' });
      const submitButton = screen.getByRole('button', { name: 'Proponer charla' });
      userEvent.type(titleInput, faker.random.word());
      userEvent.type(descriptionInput, faker.random.words());
      userEvent.type(fullNameInput, faker.random.word());
      userEvent.type(emailInput, faker.random.word());
      userEvent.click(submitButton);

      await waitFor(() => expect(props.onAddProposal).toHaveBeenCalledTimes(1));
    });

    it('should not call onAddProposal when the submit button is clicked and any mandatory field is not filled', async function () {
      const props = {
        ...defaultProps,
        onAddProposal: jest.fn(),
      };
      render(<AddProposal {...props} />);

      const submitButton = screen.getByRole('button', { name: 'Proponer charla' });
      userEvent.click(submitButton);

      await waitFor(() => {});
      expect(props.onAddProposal).not.toHaveBeenCalled();
    });
  });
});

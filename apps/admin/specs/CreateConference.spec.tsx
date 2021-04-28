import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';

import CreateConferenceComponent from '../components/CreateConference';

describe('Create new conference', () => {
  const defaultProps = {
    onCreateConference: async () => {},
  };

  describe('layout', () => {
    it('should show all the inputs and a submit button', () => {
      render(<CreateConferenceComponent {...defaultProps} />);

      expect(screen.getByRole('textbox', { name: 'Nombre de la conferencia' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Enlace para la página principal' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Lugar de celebración' })).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de inicio')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de fin')).toBeInTheDocument();
      expect(screen.getByLabelText('Logo de conferencia')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Crear conferencia' })).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    it('should call onCreateConference when the submit button is clicked and the mandatory fields are filled', async () => {
      const props = {
        ...defaultProps,
        onCreateConference: jest.fn(),
      };

      render(<CreateConferenceComponent {...props} />);
      const nameInput = screen.getByRole('textbox', { name: 'Nombre de la conferencia' });
      const urlInput = screen.getByRole('textbox', { name: 'Enlace para la página principal' });
      const submitButton = screen.getByRole('button', { name: 'Crear conferencia' });

      userEvent.type(nameInput, faker.random.word());
      userEvent.type(urlInput, faker.internet.url());
      userEvent.click(submitButton);

      await waitFor(() => expect(props.onCreateConference).toHaveBeenCalledTimes(1));
    });

    it('should not call onCreateConference when the submit button is clicked and any mandatory field is not provided', async () => {
      const props = {
        ...defaultProps,
        onCreateConference: jest.fn(),
      };

      render(<CreateConferenceComponent {...props} />);
      const submitButton = screen.getByRole('button', { name: 'Crear conferencia' });
      userEvent.click(submitButton);

      await waitFor(() => {});
      expect(props.onCreateConference).not.toHaveBeenCalled();
    });
  });
});

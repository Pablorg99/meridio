import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import CreateConference from '../pages/new-conference';

describe('Create new conference', () => {
  describe('layout', () => {
    it('should show all the inputs and a submit button', () => {
      render(<CreateConference />);

      expect(screen.getByRole('textbox', { name: 'Nombre de la conferencia' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Enlace para la página principal' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Lugar de celebración' })).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de celebración')).toBeInTheDocument();
      expect(screen.getByLabelText('Logo de conferencia')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Crear conferencia' })).toBeInTheDocument();
    });
  });
});

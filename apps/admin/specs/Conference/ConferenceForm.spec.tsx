import '@testing-library/jest-dom';

import { ConferenceDTO } from '@meridio/contracts';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';

import { ConferenceForm } from '../../components/Conference/ConferenceForm';

describe('Conference form', function () {
  const defaultProps = {
    onSubmit: () => {},
  };

  describe('layout', () => {
    it('should render all the inputs and a submit button', () => {
      render(<ConferenceForm {...defaultProps} />);

      expect(screen.getByRole('textbox', { name: 'Nombre de la conferencia' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Enlace para la página principal' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Lugar de celebración' })).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de inicio')).toBeInTheDocument();
      expect(screen.getByLabelText('Fecha de fin')).toBeInTheDocument();
      expect(screen.getByLabelText('Logo de conferencia')).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Abrir página de conferencia' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Abrir call for papers' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Abrir venta de tickets' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Crear conferencia' })).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    describe('onSubmit', function () {
      it('should call onSubmit when the submit button is clicked and the mandatory fields are filled', async () => {
        const props = {
          ...defaultProps,
          onSubmit: jest.fn(),
        };

        render(<ConferenceForm {...props} />);
        const nameInput = screen.getByRole('textbox', { name: 'Nombre de la conferencia' });
        const slugInput = screen.getByRole('textbox', { name: 'Enlace para la página principal' });
        const placeInput = screen.getByRole('textbox', { name: 'Lugar de celebración' });
        const startDateInput = screen.getByLabelText('Fecha de inicio');
        const endDateInput = screen.getByLabelText('Fecha de fin');
        const submitButton = screen.getByRole('button', { name: 'Crear conferencia' });
        userEvent.type(nameInput, faker.random.word());
        userEvent.type(slugInput, faker.random.word());
        userEvent.type(placeInput, faker.random.word());
        userEvent.type(startDateInput, faker.date.soon().toISOString());
        userEvent.type(endDateInput, faker.date.future().toISOString());
        userEvent.click(submitButton);

        await waitFor(() => expect(props.onSubmit).toHaveBeenCalledTimes(1));
      });

      it('should not call onSubmit when the submit button is clicked and any mandatory field is not provided', async () => {
        const props = {
          ...defaultProps,
          onSubmit: jest.fn(),
        };

        render(<ConferenceForm {...props} />);
        const submitButton = screen.getByRole('button', { name: 'Crear conferencia' });
        userEvent.click(submitButton);

        await waitFor(() => {});
        expect(props.onSubmit).not.toHaveBeenCalled();
      });
    });

    it('should render the form with the conference values when passed as prop', function () {
      const conference = aConference();
      const props = {
        ...defaultProps,
        conference,
      };

      render(<ConferenceForm {...props} />);

      screen.getByDisplayValue(conference.name);
      screen.getByDisplayValue(conference.slug);
      screen.getByDisplayValue(conference.place);
      screen.getByDisplayValue(conference.startDate);
      screen.getByDisplayValue(conference.endDate);
    });
  });
});

function aConference(): ConferenceDTO {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    slug: faker.random.word(),
    place: faker.random.word(),
    startDate: faker.date.soon().toISOString().split('T')[0],
    endDate: faker.date.future().toISOString().split('T')[0],
    isLandingPageOpen: faker.datatype.boolean(),
    isCallForPapersOpen: faker.datatype.boolean(),
    isTicketSalesOpen: faker.datatype.boolean(),
  };
}

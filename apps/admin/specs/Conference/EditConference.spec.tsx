import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { EditConference } from '../../components/Conference/EditConference';

describe('Edit existing conference', function () {
  const conference = aConference();
  const defaultProps = {
    onEditConference: () => {},
    conference,
  };

  describe('layout', () => {
    it('should render the conference form with the conference attributes', () => {
      render(<EditConference {...defaultProps} />);

      expect(screen.getByRole('form', { name: 'conference-form' })).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.url)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.place)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.startDate)).toBeInTheDocument();
      expect(screen.getByDisplayValue(conference.endDate)).toBeInTheDocument();
    });
  });
});

function aConference() {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    url: faker.internet.url(),
    place: faker.random.word(),
    startDate: faker.date.soon().toISOString().split('T')[0],
    endDate: faker.date.future().toISOString().split('T')[0],
  };
}

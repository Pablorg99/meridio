import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { EditConference } from '../../components/Conference/EditConference';

describe('Edit existing conference', function () {
  const defaultProps = {
    onEditConference: () => {},
  };

  describe('layout', () => {
    it('should render the conference form', () => {
      render(<EditConference {...defaultProps} />);

      expect(screen.getByRole('form', { name: 'conference-form' })).toBeInTheDocument();
    });
  });
});

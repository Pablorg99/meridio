import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { CreateConferenceComponent } from '../../components/Conference/CreateConference';

describe('Edit existing conference', function () {
  const defaultProps = {
    onCreateConference: () => {},
  };

  describe('layout', () => {
    it('should render the conference form', () => {
      render(<CreateConferenceComponent {...defaultProps} />);

      expect(screen.getByRole('form', { name: 'conference-form' })).toBeInTheDocument();
    });
  });
});

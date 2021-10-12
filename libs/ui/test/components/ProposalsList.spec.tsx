import { ProposalsList } from '@meridio/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Proposals list', function () {
  const defaultProps = {
    navigateToAddProposalPage: () => {},
  };

  it('should have a button that navigates to the add proposal page when clicked', function () {
    const props = {
      ...defaultProps,
      navigateToAddProposalPage: jest.fn(),
    };

    render(<ProposalsList {...props} />);
    const addProposalButton = screen.getByRole('button', { name: 'Añadir propuesta' });
    userEvent.click(addProposalButton);

    expect(props.navigateToAddProposalPage).toHaveBeenCalledTimes(1);
  });
});

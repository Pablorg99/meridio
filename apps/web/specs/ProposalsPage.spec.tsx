import '@testing-library/jest-dom';

import { ProposalDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';

import { ProposalsPage } from '../components/ProposalsPage';

describe('Proposals page', function () {
  const defaultProps = {
    proposals: [aProposal(), aProposal()],
    fetchProposals: () => {},
    isFetching: false,
    isError: false,
    navigateToAddProposalPage: () => {},
  };

  describe('layout', function () {
    it('should have a button that navigates to the add proposal page when clicked', function () {
      const props = {
        ...defaultProps,
        navigateToAddProposalPage: jest.fn(),
      };

      render(<ProposalsPage {...props} />);
      const addProposalButton = screen.getByRole('button', { name: 'Añadir propuesta' });
      userEvent.click(addProposalButton);

      expect(props.navigateToAddProposalPage).toHaveBeenCalledTimes(1);
    });

    it('should list the proposals passed with some information', function () {
      const [firstProposal, secondProposal] = [aProposal(), aProposal()];
      const props = {
        ...defaultProps,
        proposals: [firstProposal, secondProposal],
      };

      render(<ProposalsPage {...props} />);

      const [firstRenderedProposal, secondRenderedProposal] = screen.getAllByRole('listitem');
      expect(firstRenderedProposal).toHaveTextContent(firstProposal.title);
      expect(secondRenderedProposal).toHaveTextContent(secondProposal.title);
    });

    it('should show the proposal description when clicking in one of them', function () {
      const proposal = aProposal();
      const props = {
        ...defaultProps,
        proposals: [proposal],
      };

      render(<ProposalsPage {...props} />);
      expect(screen.queryByText(proposal.description)).not.toBeInTheDocument();
      const renderedProposal = screen.getByRole('listitem');
      userEvent.click(renderedProposal);

      expect(screen.queryByText(proposal.description)).toBeInTheDocument();
    });
  });

  describe('behaviour', function () {
    it('should fetch the proposals', function () {
      const props = {
        ...defaultProps,
        fetchProposals: jest.fn(),
      };

      render(<ProposalsPage {...props} />);

      expect(props.fetchProposals).toHaveBeenCalledTimes(1);
    });

    it('should show a loading when the data is fetching', () => {
      const props = {
        ...defaultProps,
        isFetching: true,
      };

      render(<ProposalsPage {...props} />);

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    });

    it('should show an error message when an error occurs', () => {
      const props = {
        ...defaultProps,
        isError: true,
      };

      render(<ProposalsPage {...props} />);

      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});

function aProposal(): ProposalDTO {
  return {
    id: faker.datatype.uuid(),
    ownerId: faker.datatype.uuid(),
    conferenceId: faker.datatype.uuid(),
    title: faker.random.word(),
    description: faker.random.words(),
    speakerInfo: {
      fullName: faker.name.findName(),
      email: faker.internet.email(),
    },
  };
}

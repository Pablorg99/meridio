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
    navigateToLandingPage: () => {},
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

    it('should the proposals passed in a table', function () {
      const [firstProposal, secondProposal] = [aProposal(), aProposal()];
      const props = {
        ...defaultProps,
        proposals: [firstProposal, secondProposal],
      };

      render(<ProposalsPage {...props} />);

      const [headersRow, firstProposalRow, secondProposalRow] = screen.getAllByRole('row');

      expect(headersRow).toHaveTextContent('Título de la charla');
      expect(headersRow).toHaveTextContent('Descripción de la charla');
      expect(firstProposalRow).toHaveTextContent(firstProposal.title);
      expect(secondProposalRow).toHaveTextContent(secondProposal.title);
    });

    it('should show the proposal description when clicking the button', function () {
      const [firstProposal, secondProposal] = [aProposal(), aProposal()];
      const props = {
        ...defaultProps,
        proposals: [firstProposal, secondProposal],
      };

      render(<ProposalsPage {...props} />);

      const [firstProposalDescriptionButton] = screen.getAllByRole('button');
      userEvent.click(firstProposalDescriptionButton);

      expect(screen.queryByText(firstProposal.description)).toBeInTheDocument();
      expect(screen.queryByText(secondProposal.description)).not.toBeInTheDocument();
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

      expect(screen.getByText('There was an unexpected error, try reloading the page.')).toBeInTheDocument();
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

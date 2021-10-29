import '@testing-library/jest-dom';

import { ProposalDTO } from '@meridio/contracts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';

import { ProposalsList } from '../../components/Proposal/ProposalsList';

describe('Proposals list', function () {
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

      render(<ProposalsList {...props} />);
      const addProposalButton = screen.getByRole('button', { name: 'Añadir propuesta' });
      userEvent.click(addProposalButton);

      expect(props.navigateToAddProposalPage).toHaveBeenCalledTimes(1);
    });

    it('should show a proposals table with some information', function () {
      const [firstProposal, secondProposal] = [aProposal(), aProposal()];
      const props = {
        ...defaultProps,
        proposals: [firstProposal, secondProposal],
      };

      render(<ProposalsList {...props} />);

      const [headersRow, firstProposalRow, secondProposalRow] = screen.getAllByRole('row');
      expect(headersRow).toHaveTextContent('Título');
      expect(headersRow).toHaveTextContent('Nombre del ponente');
      expect(firstProposalRow).toHaveTextContent(firstProposal.title);
      expect(firstProposalRow).toHaveTextContent(firstProposal.speakerInfo.fullName);
      expect(secondProposalRow).toHaveTextContent(secondProposal.title);
      expect(secondProposalRow).toHaveTextContent(secondProposal.speakerInfo.fullName);
    });

    it('should show the proposal description when the button is clicked', function () {
      const [firstProposal, secondProposal] = [aProposal(), aProposal()];
      const props = {
        ...defaultProps,
        proposals: [firstProposal, secondProposal],
      };

      render(<ProposalsList {...props} />);

      expect(screen.queryByText(firstProposal.description)).not.toBeInTheDocument();
      expect(screen.queryByText(secondProposal.description)).not.toBeInTheDocument();

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

      render(<ProposalsList {...props} />);

      expect(props.fetchProposals).toHaveBeenCalledTimes(1);
    });

    it('should show a loading when the data is fetching', () => {
      const props = {
        ...defaultProps,
        isFetching: true,
      };

      render(<ProposalsList {...props} />);

      expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    });

    it('should show an error message when an error occurs', () => {
      const props = {
        ...defaultProps,
        isError: true,
      };

      render(<ProposalsList {...props} />);

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

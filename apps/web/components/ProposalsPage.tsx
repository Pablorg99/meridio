import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ProposalDTO } from '@meridio/contracts';
import React, { useEffect } from 'react';

type Props = {
  proposals?: Array<ProposalDTO>;
  fetchProposals(): void;
  isFetching: boolean;
  isError: boolean;
  navigateToAddProposalPage(): void;
};

export const ProposalsPage: React.FunctionComponent<Props> = ({
  proposals,
  isFetching,
  isError,
  fetchProposals,
  navigateToAddProposalPage,
}) => {
  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isFetching) {
    return <div data-testid="loading-icon">Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (proposals) {
    return (
      <div>
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id} onClick={onOpen}>
              {proposal.title}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{proposal.title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>{proposal.description}</ModalBody>
                </ModalContent>
              </Modal>
            </li>
          ))}
        </ul>

        <button onClick={navigateToAddProposalPage}>Añadir propuesta</button>
      </div>
    );
  }

  return null;
};

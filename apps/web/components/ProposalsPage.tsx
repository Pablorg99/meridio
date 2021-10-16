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
import React from 'react';


type Props = {
  proposals: Array<ProposalDTO>;
  navigateToAddProposalPage(): void;
};

export const ProposalsPage: React.FunctionComponent<Props> = ({ proposals, navigateToAddProposalPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
};

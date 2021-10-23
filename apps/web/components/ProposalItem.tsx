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
  proposal: ProposalDTO;
};

export const ProposalItem: React.FunctionComponent<Props> = ({ proposal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <li onClick={onOpen}>
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
  );
};

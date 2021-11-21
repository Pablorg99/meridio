import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Td,
  Tr,
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
    <Tr>
      <Td>{proposal.title}</Td>
      <Td>
        <Button onClick={onOpen}>Ver descripción</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{proposal.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{proposal.description}</ModalBody>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
};

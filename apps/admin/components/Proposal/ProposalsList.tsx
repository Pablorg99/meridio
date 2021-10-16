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

export const ProposalsList: React.FunctionComponent<Props> = ({ proposals, navigateToAddProposalPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Título</th>
            <th>Nombre del ponente</th>
          </tr>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td onClick={onOpen}>
                {proposal.title}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{proposal.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{proposal.description}</ModalBody>
                  </ModalContent>
                </Modal>
              </td>
              <td>{proposal.speakerInfo.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={navigateToAddProposalPage}>Añadir propuesta</button>
    </div>
  );
};

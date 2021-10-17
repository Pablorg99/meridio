import { UserInfoDTO } from '../shared';

export type ProposalDTO = {
  id: string;
  ownerId: string;
  conferenceId: string;
  title: string;
  description: string;
  speakerInfo: UserInfoDTO;
};

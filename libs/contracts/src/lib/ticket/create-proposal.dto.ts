import { UserInfoDTO } from '../shared';

export type CreateProposalDTO = {
  id: string;
  conferenceId: string;
  title: string;
  description: string;
  speakerInfo: UserInfoDTO;
};

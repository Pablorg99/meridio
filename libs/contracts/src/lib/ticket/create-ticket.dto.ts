import { UserInfoDTO } from '../shared';

export type CreateTicketDTO = {
  id: string;
  conferenceId: string;
  assistantInfo: UserInfoDTO;
};

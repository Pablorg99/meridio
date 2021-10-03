import { UserInfoDTO } from '../shared';

export type TicketDTO = {
  id: string;
  conferenceId: string;
  assistantInfo: UserInfoDTO;
};

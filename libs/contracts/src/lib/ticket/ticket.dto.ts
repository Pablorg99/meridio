import { UserInfoDTO } from '../shared';

export type TicketDTO = {
  id: string;
  buyerId: string;
  conferenceId: string;
  assistantInfo: UserInfoDTO;
};

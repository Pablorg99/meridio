export type CreateTicketDTO = {
  id: string;
  buyerId: string;
  conferenceId: string;
  assistantInfo: UserInfo;
};

type UserInfo = {
  fullName: string;
  email: string;
  age?: number;
  country?: string;
  city?: string;
  gender?: string;
};

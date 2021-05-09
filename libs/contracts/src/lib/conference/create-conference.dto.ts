export class CreateConferenceDTO {
  id: string;
  name: string;
  url: string;
  place: string;
  startDate: string;
  endDate: string;
  logoFile?: FileList;
}
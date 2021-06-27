import { EditConferenceHandler } from '../../../src/conference/application';
import {
  Conference,
  ConferenceDateRange,
  ConferenceName,
  ConferencePlace,
  ConferenceUrl,
} from '../../../src/conference/domain';
import { ConferenceMother } from '../domain/mother/conference.mother';
import { ConferenceMockRepository } from '../mock/conference-repository.mock';
import { EditConferenceCommandMother } from './mother/edit-conference-command.mother';

describe('Edit conference command handler', function () {
  it('should update the existing conference with the command data and persist it', async function () {
    const existingConference = ConferenceMother.random();
    const command = EditConferenceCommandMother.forId(existingConference.id.value);
    const repository = new ConferenceMockRepository({ onGet: existingConference });
    const handler = new EditConferenceHandler(repository);

    await handler.execute(command);

    const expectedConference = Conference.create({
      id: existingConference.id,
      name: ConferenceName.fromString(command.name),
      url: ConferenceUrl.fromString(command.url),
      place: ConferencePlace.fromString(command.place),
      dateRange: ConferenceDateRange.fromStartAndEndDate(command.startDate, command.endDate),
    });
    expect(existingConference.name).toStrictEqual(expectedConference.name);
    expect(existingConference.url).toStrictEqual(expectedConference.url);
    expect(existingConference.place).toStrictEqual(expectedConference.place);
    expect(existingConference.startDate).toStrictEqual(expectedConference.startDate);
    expect(existingConference.endDate).toStrictEqual(expectedConference.endDate);
    expect(repository.mockSave).toHaveBeenCalledWith(existingConference);
  });
});

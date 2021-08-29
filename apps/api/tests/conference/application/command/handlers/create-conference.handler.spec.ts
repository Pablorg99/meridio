import { CreateConferenceHandler } from '../../../../../src/conference/application';
import { ConferenceMother } from '../../../domain/mother/conference.mother';
import { ConferenceMockRepository } from '../../../mock/conference-repository.mock';
import { CreateConferenceCommandMother } from '../mother/create-conference-command.mother';
import { ConferencesMockProjection } from '../../../mock/conferences-projection.mock';
import { ConferenceDTOMother } from '@meridio/contracts';

describe('Create conference command handler', async () => {
  it('should create a conference with the command passed and save it', () => {
    const repository = new ConferenceMockRepository();
    const projection = new ConferencesMockProjection({ onFind: null });
    const handler = new CreateConferenceHandler(repository, projection);
    const command = CreateConferenceCommandMother.random();
    const conference = ConferenceMother.fromCommand(command);

    await handler.execute(command);

    expect(repository.mockSave).toHaveBeenCalledWith(conference);
  });

  it('should throw an error when there is already a conference with the slug of the command', async () => {
    const repository = new ConferenceMockRepository();
    const projection = new ConferencesMockProjection({ onFind: ConferenceDTOMother.random() });
    const handler = new CreateConferenceHandler(repository, projection);
    const command = CreateConferenceCommandMother.random();

    await expect(handler.execute(command)).rejects.toThrowError(AlreadyExistingConferenceSlugError);

    expect(repository.mockSave).not.toHaveBeenCalled();
  });
});

class AlreadyExistingConferenceSlugError extends Error {
  constructor(slug: string) {
    super(`Already exists a conference with the slug: ${slug}`);
  }
}

import { CreateConferenceHandler } from '../../../../../src/conference/application';
import { AlreadyExistingConferenceSlugError } from '../../../../../src/conference/domain';
import { ConferenceMother } from '../../../domain/mother/conference.mother';
import { ConferenceMockRepository } from '../../../mock/conference-repository.mock';
import { ConferencesMockProjection } from '../../../mock/conferences-projection.mock';
import { CreateConferenceCommandMother } from '../mother/create-conference-command.mother';

describe('Create conference command handler', () => {
  it('should create a conference with the command passed and save it', async () => {
    const repository = new ConferenceMockRepository();
    const projection = new ConferencesMockProjection({ onExists: false });
    const handler = new CreateConferenceHandler(repository, projection);
    const command = CreateConferenceCommandMother.random();
    const conference = ConferenceMother.fromCommand(command);

    await handler.execute(command);

    expect(repository.mockSave).toHaveBeenCalledWith(conference);
  });

  it('should throw an error when already exists a conference with the slug of the command', async () => {
    const repository = new ConferenceMockRepository();
    const projection = new ConferencesMockProjection({ onExists: true });
    const handler = new CreateConferenceHandler(repository, projection);
    const command = CreateConferenceCommandMother.random();

    await expect(handler.execute(command)).rejects.toThrowError(AlreadyExistingConferenceSlugError);
    expect(repository.mockSave).not.toHaveBeenCalled();
  });
});

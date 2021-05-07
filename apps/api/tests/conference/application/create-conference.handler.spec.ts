import { CreateConferenceHandler } from '../../../src/conference/application';
import { ConferenceMother } from '../domain/conference.mother';
import { ConferenceMockRepository } from '../mock/conference-repository.mock';
import { CreateConferenceCommandMother } from './mother/create-conference-command.mother';

describe('Create conference command handler', () => {
  let repository: ConferenceMockRepository;
  let handler: CreateConferenceHandler;

  beforeEach(() => {
    repository = new ConferenceMockRepository();
    handler = new CreateConferenceHandler(repository);
  });

  it('should create a conference with the command passed and save it', () => {
    const command = CreateConferenceCommandMother.random();
    const conference = ConferenceMother.fromCommand(command);

    handler.execute(command);

    expect(repository.mockSave).toHaveBeenCalledWith(conference);
  });
});

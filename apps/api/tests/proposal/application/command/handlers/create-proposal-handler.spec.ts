import { CreateProposalHandler } from '../../../../../src/proposal/application';
import { ProposalMother } from '../../../domain/mother/proposal.mother';
import { ProposalMockRepository } from '../../../mock/proposal-repository.mock';
import { CreateProposalCommandMother } from '../mother/create-proposal-command.mother';

describe('Create proposal command handler', function () {
  it('should create a proposal from the command passed and save it', async function () {
    const repository = new ProposalMockRepository();
    const handler = new CreateProposalHandler(repository);
    const command = CreateProposalCommandMother.random();
    const proposal = ProposalMother.fromCommand(command);

    await handler.execute(command);

    expect(repository.mockSave).toHaveBeenCalledWith(proposal);
  });
});

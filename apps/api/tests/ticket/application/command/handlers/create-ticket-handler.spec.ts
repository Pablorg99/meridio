import { CreateTicketHandler } from '../../../../../src/ticket/application';
import { TicketMother } from '../../../domain/mother/ticket.mother';
import { TicketMockRepository } from '../../../mock/ticket-repository.mock';
import { CreateTicketCommandMother } from '../mother/create-ticket-command.mother';

describe('Create ticket command handler', function () {
  it('should create a ticket from the command passed and save it', async function () {
    const repository = new TicketMockRepository();
    const handler = new CreateTicketHandler(repository);
    const command = CreateTicketCommandMother.random();
    const ticket = TicketMother.fromCommand(command);

    await handler.execute(command);

    expect(repository.mockSave).toHaveBeenCalledWith(ticket);
  });
});

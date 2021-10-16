import { ProposalDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import {
  FindProposalsByConferenceIdHandler,
  FindProposalsByConferenceIdQuery,
} from '../../../../../src/proposal/application';
import { ProposalsMockProjection } from '../../../mock/proposals-projection.mock';

describe('FindProposalsByConferenceIdHandler', function () {
  it('should return all the proposals with the conference id passed', async function () {
    const query = new FindProposalsByConferenceIdQuery(faker.datatype.uuid());
    const proposals = [ProposalDTOMother.random(), ProposalDTOMother.random()];
    const projection = new ProposalsMockProjection({ onFind: proposals });
    const handler = new FindProposalsByConferenceIdHandler(projection);

    const foundProposals = await handler.execute(query);

    expect(foundProposals).toStrictEqual(proposals);
  });
});

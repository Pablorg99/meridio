import { proposalRepository } from '../domain';
import { ProposalMongoRepository } from './repository';

export const proposalProviders = [{ provide: proposalRepository, useClass: ProposalMongoRepository }];

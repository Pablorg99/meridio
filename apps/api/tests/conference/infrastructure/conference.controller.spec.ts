import { CreateConferenceDTO } from '@meridio/contracts';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import * as request from 'supertest';

import { conferenceModuleMetadata } from '../../../src/conference/infrastructure/conference.module';

describe('Conference controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule(conferenceModuleMetadata).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST conferences', () => {
    it('should save a ConferenceWasCreatedEvent', async () => {
      const body: CreateConferenceDTO = {
        id: faker.datatype.uuid(),
        name: faker.random.word(),
        url: faker.internet.url() + '/' + faker.datatype.number(),
        place: faker.random.word(),
        startDate: faker.date.soon().toISOString().split('T')[0],
        endDate: faker.date.future().toISOString().split('T')[0],
      };

      const response = await request(app.getHttpServer()).post('/conferences').send(body);

      expect(response.status).toBe(HttpStatus.CREATED);
    });
  });
});

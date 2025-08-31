import { initClient } from '@ts-rest/core';
import { taskContract } from 'contracts';

export const client = initClient(taskContract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});
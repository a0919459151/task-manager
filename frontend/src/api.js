import { initClient } from '@ts-rest/core';
import { taskContract } from 'contracts';

export const client = initClient(taskContract, {
  baseUrl: 'http://localhost:3000', // 後端 API 的基礎 URL
  baseHeaders: {},
});

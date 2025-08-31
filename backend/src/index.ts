import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // 引入 cors 函式庫
import { createExpressEndpoints } from '@ts-rest/express';
import { taskContract } from 'contracts';
import { taskRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApi } from '@ts-rest/open-api';

const app = express();
const port = 3000;

// 啟用 CORS，允許跨來源請求
app.use(cors());

// 啟用 Express 的 JSON 解析功能
app.use(express.json());

// 連接 MongoDB
const mongoUri = 'mongodb://localhost:27017/task-manager';
mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Could not connect to MongoDB:', err));

// 註冊 ts-rest 路由
createExpressEndpoints(taskContract, taskRouter, app);

const openApiDocument = generateOpenApi(taskContract, {
  info: {
    title: 'Task API',
    version: '1.0.0',
  },
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
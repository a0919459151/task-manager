import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // 引入 cors 函式庫
import { createExpressEndpoints } from '@ts-rest/express';
import { taskContract } from 'contracts';
import { taskRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApi } from '@ts-rest/open-api';
import logger from './logger'; // 引入 logger
import expressWinston from 'express-winston'; // 引入 express-winston

const app = express();
const port = 3000;

// 啟用 CORS，允許跨來源請求
app.use(cors());

// 啟用 Express 的 JSON 解析功能
app.use(express.json());

// 使用 express-winston 記錄所有請求
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true, // log req and res as json
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: false, // Set to false for more control over output
  colorize: true,
  requestWhitelist: ['url', 'method', 'headers', 'query', 'body'], // Explicitly log body
  responseWhitelist: ['statusCode', 'body'], // Explicitly log body
  ignoreRoute: function (req, res) { return false; } // optional: don't log certain routes
}));

// 連接 MongoDB
const mongoUri = 'mongodb://localhost:27017/task-manager';
mongoose.connect(mongoUri)
  .then(() => logger.info('✅ Connected to MongoDB'))
  .catch(err => logger.error('❌ Could not connect to MongoDB:', err));

// 註冊 ts-rest 路由
createExpressEndpoints(taskContract, taskRouter, app);

const openApiDocument = generateOpenApi(taskContract, {
  info: {
    title: 'Task API',
    version: '1.0.0',
  },
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// 使用 express-winston 記錄錯誤
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
}));

app.listen(port, () => {
  logger.info(`🚀 Backend server running at http://localhost:${port}`);
});
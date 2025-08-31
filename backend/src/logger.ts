import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info', // 預設日誌級別
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 添加時間戳
    format.errors({ stack: true }), // 記錄錯誤堆疊
    format.splat(), // 支援字串插值
    format.json() // 輸出為 JSON 格式
  ),
  transports: [
    // 輸出到控制台
    new transports.Console({
      format: format.combine(
        format.colorize(), // 控制台輸出帶顏色
        format.simple() // 簡單的控制台格式
      )
    }),
    // 輸出錯誤日誌到檔案
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // 輸出所有日誌到檔案
    // new transports.File({ filename: 'combined.log' })
  ]
});

export default logger;

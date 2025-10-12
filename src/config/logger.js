const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');

// Crear la carpeta de logs si no existe
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, timestamp, printf } = winston.format;

// Formato personalizado para los logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configuración de Winston
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(), // Agrega una marca de tiempo
    logFormat   // Usa el formato personalizado
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error',
    }),
  ],
  /*exceptionHandlers: [
    new DailyRotateFile({
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],*/
});

module.exports = logger;

//iplementacion  
//const logger = require('./config/logger');

//logger.info('La aplicación ha iniciado');
//logger.warn('¡Cuidado! Esto es una advertencia');
//logger.error('¡Algo salió mal!');
export const EnvConfig = () => ({
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/nest',
  PORT: process.env.PORT || '3002',
  DEFAULT_LIMIT: process.env.DEFAULT_LIMIT || 20,
});

import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  ENVIRONMENT: Joi.string().valid('dev', 'prod', 'test').default('dev'),
  MONGO_URI: Joi.string().required(),
  PORT: Joi.number().default(3002),
  DEFAULT_LIMIT: Joi.number().default(20),
});

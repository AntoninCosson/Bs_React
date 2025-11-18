// BackEnd/middlewares/validateZod.js
// Middleware to validate request body with Zod schemas
const { ZodError } = require('zod');

/**
 * Validates request body against a Zod schema
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware
 */
function validateBody(schema) {
  return (req, res, next) => {
    try {
      // Validate and parse body
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors for better readability
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors,
        });
      }

      // Other errors (shouldn't happen normally)
      console.error('[validateZod] Unexpected error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal validation error',
      });
    }
  };
}

/**
 * Validates request query params against a Zod schema
 */
function validateQuery(schema) {
  return (req, res, next) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          error: 'Invalid query parameters',
          details: errors,
        });
      }

      console.error('[validateZod] Unexpected error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal validation error',
      });
    }
  };
}

module.exports = {
  validateBody,
  validateQuery,
};

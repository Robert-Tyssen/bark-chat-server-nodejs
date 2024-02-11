import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const schemaValidationErrorHandler: RequestHandler = (req, res, next) => {
  // Get errors from validation results
  const errors = validationResult(req).array();
  // If errors exist, return error response code
  if (errors.length) return res.status(400).json({ errors: errors });
  // No errors occurred, go to next middleware function
  next();
}
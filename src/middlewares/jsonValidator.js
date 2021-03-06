const { body, validationResult } = require("express-validator");
const toDayunit = require("../services/dayUnit");
const userValidationRules = () => {
  return [
    body().notEmpty(),
    body("data").notEmpty().isArray(),
    body("data.*.movie_name").notEmpty().isString(),
    body("data.*.start_date").notEmpty().isString(),
    body("data.*.end_date").notEmpty().isString(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};

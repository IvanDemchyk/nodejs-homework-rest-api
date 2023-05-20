const { HttpError } = require("../helpers");

const validateData = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);
    if (error) {
      const field = error.details.map((detail) => detail.context.key);
      next(HttpError(400, `missing required ${field} field`));
    }

    next();
  };

  return func;
};

const validateFav = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };
  return func;
};

module.exports = { validateData, validateFav };

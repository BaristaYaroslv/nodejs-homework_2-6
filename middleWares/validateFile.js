const { HttpError } = require("../helpers");

const validateFile = () => {
  const func = (req, res, next) => {
    if (!req.file) {
      next(HttpError(400, "No attach file"));
    }
    next();
  };

  return func;
};

module.exports = validateFile;
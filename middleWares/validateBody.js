// const { HttpError } = require("../helpers");

const validateBody = schema => {
  const func = (req, res, next) => {
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //   throw HttpError(400);
    // }
    const { error } = schema.validate(req.body);
    if (error) {
      // next(HttpError(400, error.message));
      res.status(400).json({message: "Помилка від Joi або іншої бібліотеки валідації"});
    }

    next(error);
  };
  return func;
};

module.exports = validateBody;

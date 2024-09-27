// const { HttpError } = require("../helpers");

const validateBody = (schema) => {
	const func = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
      // next(HttpError(400, `missing fields: ${error.message}`));
      res.status(400).json({ message: `missing fields: ${error.message}` })
      return
		}

		next();
	};
	return func;
};

module.exports = validateBody;

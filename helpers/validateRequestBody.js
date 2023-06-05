// const HttpError = require('./HttpError');

const validateRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing field" })
    return
  }
  next();
};

module.exports = validateRequestBody;
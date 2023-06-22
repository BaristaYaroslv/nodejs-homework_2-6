const HttpError = require('./HttpError');

const validateRequestBody = (req, res, next) => {
  if (req.method === 'PUT' && (!req.body || Object.keys(req.body).length === 0)) {
  return next(HttpError(400, "Missing fields"));
}

  if (req.method === 'PATCH' && !req.body.favorite) {
    return next(HttpError(400, "Missing field favorite"));
  }
  next();
};

module.exports = validateRequestBody;
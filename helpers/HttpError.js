
const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

module.exports = HttpError;

// const { HttpError } = require("../helpers");

// // Декоратор для валидации тела запроса
// function validateBody(schema) {
//   return function (req, res, next) {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.details[0].message);
//     }
//     next();
//   };
// }

// module.exports = {
//   validateBody
// };
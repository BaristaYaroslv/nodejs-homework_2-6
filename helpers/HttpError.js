const messagesList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict"
}

const HttpError = (status, message = messagesList[status]) => {
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
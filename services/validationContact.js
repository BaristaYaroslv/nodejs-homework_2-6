const schemaValidation = require("./schemaValidation");

const createTextErrorValidation = (error) => {
  const message = error.details.reduce(
    (message, error) => message + error.message + "\n",
    ""
  );

  return message;
};

const validationContact = async (body) => {
  let textError = "";
  try {
    await schemaValidation.validateAsync(body, {
      abortEarly: false,
    });
  } catch (err) {
    textError = createTextErrorValidation(err);
  }

  return textError;
};

module.exports = validationContact;

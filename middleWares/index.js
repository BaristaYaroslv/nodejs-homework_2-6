const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authentication")
const upload = require("./upload");
const validateFile = require("./validateFile");
module.exports = {
    validateBody,
    isValidId,
    authenticate,
    upload,
    validateFile,
};

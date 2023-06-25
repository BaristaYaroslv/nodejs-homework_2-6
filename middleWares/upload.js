const multer = require("multer");
const path = require("path");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    // const uniqurePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // const { originalname } = file;
    // const filename = `${uniqurePreffix}_${originalname}`;
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
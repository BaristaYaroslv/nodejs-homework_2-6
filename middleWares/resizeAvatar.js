const path = require("path");
const fs = require("fs/promises");

const Jimp = require("jimp");
const { HttpError } = require("../helpers");

const resizeAvatar = async (req, res, next) => {
  try {
    const { path: tmpUpload, destination: tmpDir, originalname } = req.file;

    const pathToSmallFile = path.join(tmpDir, `sm_${originalname}`);

    await fs.rename(tmpUpload, pathToSmallFile);

    const smallImage = await Jimp.read(pathToSmallFile);

    smallImage.resize(250, 250).write(tmpUpload);

    // DElete small file
    await fs.rm(pathToSmallFile);

    next();
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

module.exports = resizeAvatar;
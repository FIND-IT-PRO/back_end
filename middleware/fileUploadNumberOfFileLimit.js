require("dotenv").config();
module.exports = function fileUploadCategories(req, res, next) {
  try {
    if (Object.keys(req.files).length > +process.env.MAX_FILE_UPLOAD_NUMBER)
      throw new Error("too many files");
    next();
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

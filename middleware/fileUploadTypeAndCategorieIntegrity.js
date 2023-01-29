const checkExtension = require("../helpers/checkExtension");

module.exports = function fileUploadCategories(req, res, next) {
  try {
    const { categorie } = req.query;
    checkExtension.checkType(categorie, req.files); //categorie must be supported first (check the function in case of error)
    next();
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

module.exports = function fileUploadCategories(req, res, next) {
  try {
    const { categorie } = req.query;
    if (!categorie) throw new Error("categorie is required");
    const categories = ["images", "videos", "audios"]; //NB : TO ADD A CATGEORIE YOU MUST ADD A CONTIANER OF IT IN AZURE
    if (!categories.includes(categorie))
      throw new Error("categorie is not valid");
    next();
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

const express = require("express");
const fileUploadWithOptions = require("../middleware/fileUploadWithOptions.js");
// console.log(
//   "🚀 ~ file: storages.js:3 ~ fileUploadWithOptions",
//   fileUploadWithOptions
// );
const router = express.Router();
const StorageController = require("../controllers/storage.js"); //UsersController is the class (controller)
const fileUploadCategories = require("../middleware/fileUploadCategories.js");
const fileUploadTypeAndCategorieIntegrity = require("../middleware/fileUploadTypeAndCategorieIntegrity.js");
const fileUploadNumberOfFileLimit = require("../middleware/fileUploadNumberOfFileLimit.js");
//!order of the middleware is important
//check if the categorie is supported
router.use(fileUploadCategories);
// delete a file
router.delete("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) throw new Error("no url");
    const { categorie } = req.query;
    const result = await StorageController.removeUploadedFile(url, categorie);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    // console.log(e);
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
//check the limites and more default options
router.use(fileUploadWithOptions);
// limit the number of files
router.use(fileUploadNumberOfFileLimit);
//check if the file type is supported per categorie
router.use(fileUploadTypeAndCategorieIntegrity);
//! upload signle file first
//todo multiple file upload
router.post("/", async (req, res) => {
  try {
    if (!req.files) throw new Error("no files");
    const blockBlobClients = StorageController.getBlobNames(
      req.query.categorie,
      req.files
    ); //based on the the previous middleware req,body.categorie containe a support container name
    const urls = blockBlobClients.map((blockBlobClient) => blockBlobClient.url);
    // console.log("🚀 ~ file: storages.js:18 ~ router.post ~ urls", urls);
    await StorageController.uploadFiles(blockBlobClients, req.files);
    res.status(201).json({
      status: "success",
      data: urls,
    });
  } catch (e) {
    // console.log(e);
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
router.put("/", async (req, res) => {
  //todo
  try {
    const fileKey = Object.keys(req.files);
    if (fileKey.length > 1)
      throw new Error("you can modify one file per request");
    const filerUrl = req.header("file-url");
    // console.log("🚀 ~ file: storages.js:73 ~ router.put ~ filerUrl", filerUrl);
    if (!filerUrl) throw new Error("no url found for this file");
    const { categorie } = req.query;
    const result = await StorageController.updateUploadedFile(
      filerUrl,
      categorie,
      req.files[fileKey[0]]
    );
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

module.exports = router;

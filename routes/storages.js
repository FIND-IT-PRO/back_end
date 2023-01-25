const express = require("express");
const fileUploadWithOptions = require("../middleware/fileUploadWithOptions.js");
// console.log(
//   "🚀 ~ file: storages.js:3 ~ fileUploadWithOptions",
//   fileUploadWithOptions
// );
const router = express.Router();
const StorageController = require("../controllers/storage.js"); //UsersController is the class (controller)
/* GET users listing. */

router.use(fileUploadWithOptions);
//! upload signle file first
//todo multiple file upload
router.post("/", async (req, res) => {
  try {
    const blockBlobClients = StorageController.getBlobNames(req.files);
    const urls = blockBlobClients.map((blockBlobClient) => blockBlobClient.url);
    // console.log("🚀 ~ file: storages.js:18 ~ router.post ~ urls", urls);
    res.status(200).json({
      status: "succes",
      data: urls,
    });
    await StorageController.uploadFiles(blockBlobClients, req.files);
    // res.json({ status: "succes", data: "done" });
  } catch (e) {
    console.log(e);
    // res.status(500).json({
    //   status: "fail",
    //   message: e.message,
    // });
  }
});
//todo
// router.post("/:id",async (req, res) => {})
// router.delete("/:url",async (req, res) => {
//   try {
//     await StorageController.deleteFile(req.params.url);
//     res.status(200).json({
//       status: "succes",
//       data: "done",
//     });
//   } catch (e) {
//     console.log(e);
//     // res.status(500).json({
//     //   status: "fail",
//     //   message: e.message,
//     // });
//   }
// })
//todo

module.exports = router;

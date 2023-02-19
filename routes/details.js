const express = require("express");
const router = express.Router();
const detailsController = require("../controllers/details");

router
  .route("/")
  .post(detailsController.addData)
  .get(detailsController.getAllData);
router
  .route("/:_id")
  .get(detailsController.getDataById)
  .patch(detailsController.updateData)
  .delete(detailsController.deleteData);

module.exports = router;

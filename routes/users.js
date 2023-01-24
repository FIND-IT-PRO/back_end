const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); //UsersController is the class (controller)
const authController = require("../controllers/authController");

/* GET users listing. */
// router.route("/:id").get(userController);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

module.exports = router;

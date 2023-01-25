const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); //UsersController is the class (controller)
const authController = require("../controllers/authController");

/* GET users listing. */
// router.route("/:id").get(userController);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword/:token").post(authController.resetPassword);

router.route("/posts").get(authController.protectRoute);

module.exports = router;

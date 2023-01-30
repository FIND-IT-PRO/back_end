const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); //UsersController is the class (controller)
const authController = require("../controllers/authController");

/* GET users listing. */
// router.route("/:id").get(userController);

// Authentication routes
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword/:token").post(authController.resetPassword);
router.route("/logout").get(authController.logout);

// User Routes
router.route("/updateMyInfo/:id").patch(userController.updateMyInfo);
router.route("/updateMyPassword/:id").patch(userController.updateMyPassword);
router.route("/deleteMyAccount").delete(userController.deleteMyAccount);

// Authorization route
router.route("/posts").get(authController.protectRoute);

module.exports = router;

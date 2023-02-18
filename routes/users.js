const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); //UsersController is the class (controller)
const authController = require("../controllers/authController");
const passport = require("passport");

/* GET users listing. */
// router.route("/:id").get(userController);

// Authentication routes
router
  .route("/signup")
  .post(authController.checkEmailAndPasswordExistence, authController.signup);
router.route("/login").post(authController.login);

// ! Login or signup with Google API
router.get(
  "/login/google",
  // "google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/login/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
  );
  
  // ! Login or signup with Facebook API
  router.get(
    "/login/facebook",
    passport.authenticate(
      "facebook",
      { scope: ["email"] }
      // , {
      //   scope: ["profile", "email"],
      // }
    )
  );
  
router.get(
  "/login/facebook/secrets",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// User Routes
router.route("/updateMyInfo/:id").patch(userController.updateMyInfo);
router.route("/updateMyPassword/:id").patch(userController.updateMyPassword);
router.route("/deleteMyAccount").delete(userController.deleteMyAccount);

// todo prevent who sign up with a provider of using this routes
// router.use(userController.preventLoggedUserWithprovider);
router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword/:token").post(authController.resetPassword);
router.route("/logout").get(authController.logout);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); //UsersController is the class (controller)
const authController = require("../controllers/authController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

/* GET users listing. */
// router.route("/:id").get(userController);

//* Genrating Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//* Creating and Sending the token to the User
const sendingToken = (user, status, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password
  user.password = undefined;

  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
  }).redirect('/');
};

// Authentication routes
router
  .route("/signup")
  .post(authController.checkEmailAndPasswordExistence, authController.signup);

router.route("/signup").post(authController.signup);
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
  (req, res) => {
    // Successful authentication, redirect home.
    // return res
    //     .status(200)
    //     .cookie('jwt', jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    //       expiresIn: process.env.JWT_EXPIRES_IN,
    //     }), {
    //       httpOnly: true
    //     })
    //     .redirect('/')

    sendingToken(req.user, 200, res);
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
    // res.redirect("/");
    sendingToken(req.user, 200, res);
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

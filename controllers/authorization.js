const jwt = require("jsonwebtoken");
require("dotenv").config();
class Authorization {
  constructor() {}
  async authGard(req, res, next) {
    try {
      const UnauthorizedMessage = "You are not Unauthorized";
      // extracting the jwt from the coockies
      const { jwt: jwt_token } = req.cookies;
      if (!jwt_token) throw new Error(UnauthorizedMessage);
      // checking the excisting jwt is correct ( it thorw an error if the segnature is not valid)
      const { id, exp } = jwt.verify(jwt_token, process.env.JWT_SECRET);
      // ceck if the date is valid
      if (exp >= new Date()) throw new Error(UnauthorizedMessage);
      //so we can check if the same user who triger this api call
      res.user_id = id;
      next();
    } catch (e) {
      res.status(401).json({
        status: "failed",
        message: e.message,
      });
    }
  }
  //   async ownershipGard(req, res, next) {
  //     // if this message get send that means is someone is trying to do actions on others resources like deleting an account
  //     const spamDetectionMessage =
  //       "You can't change others resources ,this incident will be reported,and your message may be closed due to this activite";
  //     req.body.user_id && req.body.user_id === req.user_id
  //       ? res
  //           .status(401)
  //           .json({ status: "failed", message: spamDetectionMessage })
  //       : next();
  //   }
}
module.exports = new Authorization();

//     // if (!userToken) {
//     //   return res.status(401).json({
//     //     status: "failed",
//     //     message: "You are not logged in yet!",
//     //   });
//     // }

//     const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
//     const currentUser = await User.findById(decoded.id);

//     res.status(200).json({
//       status: "success",
//       message: "You have a permission to access this route",
//       data: {
//         currentUser,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error,
//     });
//   }
// };

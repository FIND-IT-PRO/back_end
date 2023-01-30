const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users"); //UsersController is the class (controller)

/* GET users listing. */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersController.getUser(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

module.exports = router;

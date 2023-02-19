module.exports = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email or password missing.",
    });
  }
  //? this is the middleware that checks if the email is valid(syntax and domain and smtp pinging the designated email server) ))
  const { valid, reason, validators } = await isEmailValid(email);

  if (!valid)
    res.status(400).send({
      message: "Please provide a valid email address.",
      reason: validators[reason].reason,
    });
  next();
};

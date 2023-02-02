const express = require("express");
const router = express.Router();
const emailValidator = require("deep-email-validator");

module.exports = async function isEmailValid(email) {
  return emailValidator.validate(email);
};

  const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name!"],
  },
  email: {
    type: String,
    required: [true, "User must have an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valide email!"],
    // trim: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: 8,
    select: false, // this step is important
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      // The only works on SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords Are Not The Same!",
    },
  },
  rewardPoint: Number,
  address: {
    type: String,
    // required: [true, "Please add your address!"],
  },
  photo: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: "",
  },
  modefiedAt: {
    type: Date,
    default: "",
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

usersSchema.pre("save", async function (next) {
  // Only run this function if password was actually  modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});


usersSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

usersSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};


module.exports = mongoose.model("users", usersSchema);


// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);
// // Store hash in your password DB.
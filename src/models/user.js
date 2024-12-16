
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      validate(value){
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender:{
      type: String,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("Gender is not valid");
        } 
      },
    },
    password: {
      type: String,
      validate(value) {
        // Use validator isStrongPassword method
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    photoUrl:{
      type:String,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
userSchema.methods.getJWT = function() {
  // Generate a token for the user
  return jwt.sign({ _id: this._id }, "DEVTINDER@28", { expiresIn: '7d' });
};

const User = mongoose.model("User", userSchema);
module.exports = User;

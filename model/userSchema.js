const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address"
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
    // minlength: [6, "OTP must be 6 characters long"]
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Merchant"],
    default: "User"
  },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;

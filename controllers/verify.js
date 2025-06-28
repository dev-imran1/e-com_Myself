const User = require("../model/userSchema");

const otpControllers = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const data = await User.findOne({ email: email });

    if (!data) {
      return res.status(404).send("User not found");
    }

    if (data.otp === otp) {
      await User.findOneAndUpdate(
        { email: email },
        { $set: { otp: "", verify: true } }
      );
      res.send("OTP matched and user verified");
    } else {
      res.send("OTP not match");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = otpControllers;


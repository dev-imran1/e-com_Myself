const bcrypt = require("bcrypt");
const User = require("../model/userSchema");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    // Optionally send token or user data
    res.send("Login successful", {email: user.email} );
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
};

module.exports = loginController;

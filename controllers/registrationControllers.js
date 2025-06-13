const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const emailValidation = require("../helpers/emailValidation");
const nodemailer = require("nodemailer");

let registrationControllers = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.send("Name is required");
  if (!email) return res.send("Email is required");
  if (!password) return res.send("Password is required");

  if (!emailValidation(email)) {
    return res.send("Valid email required");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already registered with this email");
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "imran.cit.bd@gmail.com",
        pass: "srta ejor xnkv hktg", 
      },
    });

      // Email options
    const mailOptions = {
      from: 'imran.cit.bd@gmail.com',
      to: 'freealltime247@gmail.com',
      subject: "Registration Successful",
      html: `<h2>Welcome, ${name}!</h2><p>Your registration was successful.</p>`,
    };

    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = registrationControllers;

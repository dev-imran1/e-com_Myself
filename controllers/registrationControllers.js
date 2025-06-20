const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const emailValidation = require("../helpers/emailValidation");
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

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
    // Generate OTP
    let otp =  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    // Hash password  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp: otp,
    });

    await user.save();
   

   console.log(otp)
    // Set up nodemailer transporter

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "imran.cit.bd@gmail.com",
        pass: "iwxr qokd rsur wkyg",
      },
    });

    // Mail options
    const mailOptions = {
      from: "freealltime247@gmail.com",
      to: "imran.cit.bd@gmail.com",
      subject: "Verify Your Email Address",
      html: `
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;
                    font-family:sans-serif;box-shadow:0 0 10px rgba(0,0,0,0.1);">
          <div style="background:#4CAF50;color:white;text-align:center;padding:20px;">
            <h2>Ecommerce</h2>
          </div>
          <div style="padding:30px;color:#333;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <div style="font-size:24px;font-weight:bold;text-align:center;
                        background:#f4f4f4;padding:15px;margin:20px 0;border-radius:6px;">
              ${otp}
            </div>
            <p>This OTP is valid for <strong>1 minutes</strong>. Do not share it with anyone.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Thanks,<br>Ecommerce</p>
          </div>
          <div style="background:#f1f1f1;text-align:center;padding:10px;color:#888;font-size:12px;">
            &copy; 2025 Ecommerce. All rights reserved.
          </div>
        </div>
      `,
    };
    // Generate verification URL
    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);

    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = registrationControllers;

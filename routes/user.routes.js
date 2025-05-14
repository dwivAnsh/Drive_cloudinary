const express = require("express");
const router = express.Router();

// express-validator is used to validate the data to check if the data is correct or not
const { body, validationResult } = require("express-validator");

const userModel = require("../models/user.models");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// We use /user route in app.js so /user/register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);

    // if errors are there then return 400 status

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }

    // if errors are not there then create a new user

    const { email, password, username } = req.body;

    const hashPassword = await bcrypt.hash(password, 10); // security aur performace ko dekh kar balance banane ke liye 10 baar hash use karengey

    const newUser = await userModel.create({
      email,
      username,
      password: hashPassword,
    });

    res.json(newUser); //json format me data hum newuser me lekar rakh diye
  }
);

// Login Page 👇

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login", 
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid Data",
      });
    }

    const { username, password } = req.body;

    // check if the user is present or not
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    // cookie me token store karte hain and session manage karte hain
    // install cookie-parser 

    // res.json({ token }); // authorize rakhne ke liye 
    res.cookie('token',token) // name and value
    res.send('Logged In')
  }
);


module.exports = router;

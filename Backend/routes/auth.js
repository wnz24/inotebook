const express = require('express');
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/User.js');
const fetchuser = require('../middleware/fetchuser.js');


const JWT_SECRET = "harry is good"
// Route2 : create a user using: POST request "/api/auth/createuser", no login required
router.post('/createuser', [
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("Email", "Enter a valid Email").isEmail(),
  body("Password", "Password must be five characters").isLength({ min: 5 }),
], async (req, res) => {
  // if there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check wether the user with the given email exists already
  try {
    let user = await User.findOne({ Email: req.body.Email });
    if (user) {
      return res.status(400).json({ error: "Sorry! A user with this Email alreay exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.Password, salt);

    user = await User.create({
      name: req.body.name,
      Password: secPass,
      Email: req.body.Email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authatoken = jwt.sign(data, JWT_SECRET)
    res.json({ authatoken })
    //  res.json(user);



  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred")
  }
})

// Route1 : Authenticate a user using: POST request "/api/auth/login", no login required
router.post('/login', [
  body("Email", "Enter a valid Email").isEmail(),
  body("Password", "Password cannot be blank").exists(),

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { Email, Password } = req.body;
  try {
    let user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ error: "Please enter valid credentials" })
    }

    const Passwordcompare = await bcrypt.compare(Password, user.Password)
    if (!Password) {
      res.status(400).json({ error: "Please enter valid credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authatoken = jwt.sign(data, JWT_SECRET)
    res.json({ authatoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})
// Route3 : get logedin user details using: POST request "/api/auth/getuser", Login required
router.post('/getuser', fetchuser, async (req, res) => {



  try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-Password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})

module.exports = router
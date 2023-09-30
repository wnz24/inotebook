const express = require('express');
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// create a user using: POST request "/api/auth/createuser", no login required
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
    user = await User.create({
      name: req.body.name,
      Password: req.body.Password,
      Email: req.body.Email,
  })
   res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred")
  }
})

module.exports = router
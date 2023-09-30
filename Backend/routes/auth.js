const express= require('express');
const  User  = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const router= express.Router();


router.post('/',[
    body("name","Enter a valid name").isLength({min:3}),
    body("Email","Enter a valid Email").isEmail(),
    body("Password","Password must be five characters").isLength({min:5}),
], (req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }
  
  User.create({
    name: req.body.name,
    Password: req.body.Password,
    Email: req.body.Email,
  }).then(user => res.json(user))
  .catch(err=>{console.log(err)
    res.json({error: "Please enter a valid email", message: err.message})
})})

module.exports = router
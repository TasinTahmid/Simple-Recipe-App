const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users');

const router = express.Router();

router.post('/register', async (req, res) => {
  const {username, password} = req.body;

  const user = await UserModel.findOne({username});
  if(user) return res.status(400).json({message: 'User already exists.'});

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({username, password: hashPassword});
  await newUser.save();

  res.status(200).json({message: 'User added successfully.'});
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const user = await UserModel.findOne({username});
  if(!user) return res.status(404).json({message: 'User not found.'});

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid) return res.status(400).json({message: 'Username or password is incorrect.'});

  const token = jwt.sign({ id: user._id}, 'secret');
  
  res.status(200).json({token, userId: user._id});
});

module.exports = router;
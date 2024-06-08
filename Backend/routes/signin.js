const express = require("express");
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token, msg: 'Sign-in successful' });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  module.exports = router;
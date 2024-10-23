const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ "message": "All fields required" });
    }
  
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
  
    try {
      await user.save(); // No callback, using async/await
      const token = user.generateJwt();
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json(err);
    }
  };
  const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ "message": "All fields required" });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user || !user.validPassword(req.body.password)) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      // Generate JWT token
      const token = user.generateJwt();
      res.status(200).json({ token });
  
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  };
module.exports = {
register,
login
};
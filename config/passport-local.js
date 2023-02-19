const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//require bcrypt library for encryption/decryption
const bcrypt = require('bcrypt');

// Configure the local strategy with a custom verify function
const localStrategy = new LocalStrategy({usernameField: 'email',passwordField: 'password'},async (email, password, done) => {
    try {
      // Find the user with the given username
      const user = await User.findOne({ email });
  
      // If the user does not exist, return an error
      if (!user) {
        console.log('User not found');
        return done(null, false, { message: 'Incorrect email' });
      }

      
      //decrypt and check password from stored one
      const passwordMatches = await bcrypt.compare(password, user.password);

  
      //verify password
      if (!passwordMatches) {
        console.log('Invalid password');
        return done(null, false);
      }
      
  
      // Otherwise, return the user object
      return done(null, user);
      
    } catch (err) {
        console.log('Error while authenticating user');
      return done(err);
    }
  });

module.exports = localStrategy;

  
 
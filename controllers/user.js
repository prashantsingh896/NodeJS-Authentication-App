const User = require('../models/user');
const bcrypt = require('bcrypt');




module.exports.renderSignIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('sign_in', { title: 'Sign In' });
}

module.exports.renderSignUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('sign_up', { title: 'Sign Up' });

}

module.exports.renderHome = function (req, res) {
    return res.render('home', { title: 'Home Page', user: req.user });
}

module.exports.renderResetPassword = function(req,res){
    return res.render('reset_password',{title:'Reset Password', user: req.user});
}

//update password
module.exports.updatePassword = async function(req,res){
    try{
        
        const user = await User.findOne({email:req.body.email});
        //match current password
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatches){
            console.log('current password entered is invalid, try again:');
            return res.redirect('back');
        }

        const plaintextPassword = req.body.new_password;
        const saltRounds = 10;
        const hash = await bcrypt.hash(plaintextPassword, saltRounds);
        user.password = hash;
        await user.save();
        console.log('Password updated');
        return res.redirect('/destroy-session');

    }
    catch(e){
        console.log('Error in reseting password: ',e);
    }

}


//create account
module.exports.create = async function (req, res) {

    try {

        if (req.body.password != req.body.confirm_password) {
            //throw noty notification that password don't match and redirect to sign Up
            
            return res.redirect('back');
        }

        //check if user already exist
        const user = await User.findOne({email:req.body.email});
        if(user){
            console.log('User already exist');
                
            return res.redirect('back');
        }

        const plaintextPassword = req.body.password;
        const saltRounds = 10;

        const hash = await bcrypt.hash(plaintextPassword, saltRounds);


        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });

        // save the new user to the database
        const savedUser = await newUser.save();



        //throw Noty 

        res.status(200);

        if (process.env.NODE_ENV == "development") {
            console.log('New User created: ', savedUser);
        }

              

        return res.redirect('/');

    }
    catch (e) {
        console.log('Error in creating user: ',e);
        return res.redirect('back');
    }

}


//create session
module.exports.createSession = function (req, res) {
    
    return res.redirect('/home');
}

//destroy session
module.exports.destroySession = function (req, res) {

    req.logout(function (err) {
        if (err) {
            console.log('Error in logging out :', err);
        }
         
        console.log("logged out");
        return res.redirect('/');
    })

}
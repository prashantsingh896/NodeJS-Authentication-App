module.exports.renderSignIn = function(req,res){
    return res.render('./sign_in',{title:'Sign In'});
}

module.exports.renderSignUp = function (req,res){
    return res.render('./sign_up',{title:'Sign Up'});

}

module.exports.renderHome = function(req,res){
    return res.render('./home',{title:'Home Page'})
}

//validate and create session
module.exports.signIn = function(req,res){

}

//create account
module.exports.create = function(req,res){

}


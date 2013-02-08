var FBUser = require('../models/FBUser')

exports.loginLandingPage = function(req, res){
	res.render('loginLandingPage', {title: "Login with Facebook"});
}
exports.main = function(req, res){
	res.render('homepage', {title: "Welcome to MyFacebookSpace!", curr_user: req.session.user});
};
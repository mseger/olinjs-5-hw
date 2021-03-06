var FBUser = require('../models/FBUser')

exports.loginLandingPage = function(req, res){
	res.render('loginLandingPage', {title: "Login with Facebook"});
}
exports.main = function(req, res){
	if(req.session.user !== null){
		res.render('homepage', {title: "Welcome to MyFacebookSpace!", curr_user: req.session.user});
	}else{
		res.redirect('/');
	}
};

// display color update
exports.updateColor = function(req, res){
	res.render('/homepage');
}

// post color update to profile settings
exports.updateColor_post = function(req, res){
	var currUser = FBUser.findOne({name: req.session.user.name}).exec(function(err, user){
		if(err)
			console.log("Unable to update user profile color settings.");
		user.profileBackground = req.body.color; 
		user.save(function (err){
			if(err)
				return console.log("Can't save updated user.");
			res.render('homepage', {title: "Welcome to MyFacebookSpace!", curr_user: user});
		}); 
	});
}; 

// post quote remove update to profile settings
exports.updateQuotes_post = function(req, res){
	var currUser = FBUser.findOne({name: req.session.user.name}).exec(function(err, user){
		if(err)
			console.log("Unable to update user profile quotes settings.");
		user.quotes = [];
		user.save(function (err){
			if(err)
				return console.log("Can't save updated user.");
			req.session.user = user;
			res.render('homepage', {title: "Welcome to MyFacebookSpace!", curr_user: user});
		}); 
	});
}; 

// post quotes add update to profile settings
exports.updateQuotes_post_add = function(req, res){
	var currUser = FBUser.findOne({name: req.session.user.name}).exec(function (err, user){
		if (err)
			console.log("Couldn't modify user's quotes settings");
		req.facebook.api('/me', function(err, data){
			user.quotes = data.quotes;
			user.save(function (err){
				if (err)
					return console.log("Couldn't save your user");
				req.session.user = user;
				res.render('homepage', {title: "Welcome to MyFacebookSpace!", curr_user: user});
			});
		});
	});
};













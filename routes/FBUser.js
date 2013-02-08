var FBUser = require('../models/FBUser')

// login a new user, start a new session
exports.login = function (req, res) {
  req.facebook.api('/me', function(err, data){
  	req.facebook.api('/me/picture?redirect=false&type=large', function(err, picData){
  		var loggedInUser = new FBUser({name: data.name, profPicURL: picData.data.url});
  		req.session.user = loggedInUser; 
  		res.redirect('/homepage');
  	})
  })
};

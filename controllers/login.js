var db=require('./../models/db');
var express=require('express');
var router=express.Router();
var adminModel=require('./../models/adminmodel');


router.get('/',(req,res)=>{
    res.render('login/login');
});

router.post('/', function(request, response){
	
	var user = {
		username: request.body.username,
		password: request.body.password
	};

	adminModel.validate(user, function(status){
		console.log('login status',status);
		if(status==0){
			response.cookie('username', user.username);
			response.cookie('userstatus', status);
			response.redirect('/admin');
		}
		else if(status==1){
			response.cookie('username', user.username);
			response.cookie('userstatus', status);
			response.redirect('/customer');
		}
		
		else{
			//response.send('invalid username/password');	
			response.redirect("/login");	
		}
	});

});

module.exports = router;

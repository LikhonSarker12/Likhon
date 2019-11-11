var express=require('express');
var adminModel = require('../models/adminmodel');
var customerModel=require('../models/usermodel');
var router=express.Router();
router.get('/',(req,res)=>{
    res.render('registration/index');
});
router.get('/admin',(req,res)=>{
        res.render('registration/adminindex');
});
router.post('/admin', function(request, response){

	var user = {
		 Name: request.body.name,
        address: request.body.address,
        email:request.body.Emailaddress,
        contract:request.body.contract,
		username: request.body.username,
		password: request.body.password,
		confirmpass:request.body.confirmpassword,
		
	};
	if(user.Name=='' ||  user.address=='' ||user.email==''||user.contract=='' || user.username==''|| user.password==''||user.confirmpass=='')
		{
		    response.redirect('/registration/admin');
		 
		}
	if(user.password==user.confirmpass)
	{
	 adminModel.insertLogin(user, function(status){
			console.log('or',status);
			if(status){
				response.redirect('/login');
			}else{
				response.redirect('/registration/admin');
			}
		});
	}
	else{
		console.log('passward not');
	}
	

	
});
router.get('/customer',(req,res)=>{
	res.render('registration/customerindex');
});
router.post('/customer', function(request, response){

var user = {
	Name: request.body.name,
	address: request.body.address,
	email:request.body.Emailaddress,
	contract:request.body.contract,
	username: request.body.username,
	password: request.body.password,
	confirmpass:request.body.confirmpassword,
	
};
if(user.Name=='' || user.address=='' ||user.email==''||user.contract=='' || user.username==''|| user.password==''||user.confirmpass=='')
	{
		response.redirect('/registration/customer');
	 
	}
if(user.password==user.confirmpass)
{
 customerModel.insertLogin(user, function(status){
		console.log('or',status);
		if(status){
			response.redirect('/login');
		}else{
			response.redirect('/registration/customer');
		}
	});
}
else{
	console.log('passward not mach');
}



});
module.exports = router;
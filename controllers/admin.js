var db=require('./../models/db');
var express=require('express');

var router=express.Router();
var usermodel=require('./../models/usermodel');
router.get('/', (req,res)=>{
		if(req.cookies['username'] != null){
			res.render('admin/admin');		
		}else{
			res.redirect('/logout');
		}	
});
router.get('/adduser', (req,res)=>{
	res.render('admin/adduser');
});
router.post('/adduser', function(request, response){

	var user = {
		username: request.body.username,
		password: request.body.password,
		status: request.body.status,
		
	};
	console.log(user);

	usermodel.insert(user, function(status){
		 console.log(status);
		if(status){
			response.redirect('/admin/customerlist');
		}else{
			response.redirect('/admin/adduser');
		}
	});
	
});
router.get('/customerlist', function(request, response){
	 
	usermodel.getAll(function(result){	
		if(result){
			response.render("admin/customer", result);
		}else{
			response.redirect("/admin/customerlist");	
		}
	})
});




module.exports = router;
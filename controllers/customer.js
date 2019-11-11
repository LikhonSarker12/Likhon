var express=require('express');
var customerModel=require('../models/usermodel');
var router=express.Router();
router.get('*',(req,res,next)=>{
	if(req.cookies['username']!=null)
	{
		if(req.cookies['userstatus']==1)
		{
			next();
		}
		else
		{
			res.redirect('/logout');
		}
	}
	else
	{
		res.redirect('/login');
	}

});
router.get('/',(req,res)=>{
    res.render('customer/index');
});
router.get('/profile', function(request, response){
	user={
		username:request.cookies['username'],
	}
	   
	customerModel.getCustomer( user,function(results){
			
		 response.render('customer/profile',  {users:results});
	 });
   });
   router.get('/Update/:id', function(request, response){
		
		   
	customerModel.getById( request.params.id,function(results){
			
		response.render('customer/updateprofile',  results);
	});
});
router.post('/Update/:id', function(request, response){
	user={
		id:request.params.id,
		name:request.body.name,
		address:request.body.address,
		email:request.body.email,
		contact:request.body.contact,
		username:request.body.username,
		password:request.body.password,
		cookiename:request.cookies['username'],

	}
	  
customerModel.updateCustomer( user,function(results){
	console.log('update',user);
	response.cookie('username', user.username);
	response.redirect('/customer/profile');
});
});
router.get('/ordermedicine',function(request,response){

	customerModel.getAllmedicines(function(results){
		response.render('customer/ordermedicine',{users:results})

	})
})
router.post('/ordermedicine',function(request,response){
	user={
		
		name:request.body.name,
		category:request.body.category,
		amount:request.body.amount,
		date:request.body.date,
		username:request.cookies['username'],
		
	}
		if(user.name==null ||  user.name=='' ||user.category==null || user.amount==null|| user.date=='')
		{
		    console.log(' null');
			response.redirect('/customer/ordermedicine');
		 
		}
	
	else{
		customerModel.insertOrdercustomer(user,function(status){
			if(status){
			
				response.redirect('/customer/show');	
			}else{
				response.redirect('/logout');
			}
		});	
	}
	
})
router.get('/show',function(request,response){
	user={
		username:request.cookies['username'],
	}
	customerModel.getAllusername(user,function(results){
		response.render('customer/allshow',{users:results});
	})
})
router.post('/show',function(request,response){
	
		console.log("id:::",request.body.id);
	
	customerModel.getByIdorder2(request.body.id,function(results){
		response.render('customer/allshow',{users:results});
	})
})
router.get('/deleteorder/:id',function(request,response){
	customerModel.delete(request.params.id,function(status){
		if(status)
		{
			response.redirect('/customer/show');	
		}
	})
})
router.get('/updateorder/:id',function(request,response){
	
	customerModel.getByIdorder(request.params.id,function(results){
		response.render('customer/update',results);
	})
})
router.post('/updateorder/:id',function(request,response){
	user={
		category:request.body.category,
		amount:request.body.amount,
		date:request.body.date,
		id:request.params.id,
	}
	
	customerModel.updateorder(user,function(status){
		if(status)
		{
			response.redirect('/customer/show');	
		}
	})
})

module.exports=router;
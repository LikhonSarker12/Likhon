var express=require('express');
var adminModel=require('./../models/adminmodel');
var router=express.Router();
//console.log('i m in student controller');
router.get('*',(req,res,next)=>{
	if(req.cookies['username']!=null)
	{
		if(req.cookies['userstatus']==0)
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
router.get('/', function(req, res){
	
	res.render('admin/index');		
		
	});
	router.get('/profile', function(request, response){
     user={
		 username:request.cookies['username'],
	 }
		
	  adminModel.getAllusername( user,function(results){
			 
		  response.render('admin/profile',  {users:results});
	  });
	});
	  router.get('/Update/:id', function(request, response){
		
		   
		 adminModel.getById( request.params.id,function(results){
			     
			 response.render('admin/updateprofile',  results);
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
		  
	adminModel.updateAdmin( user,function(results){
		console.log('update',user);
		response.cookie('username', user.username);
		response.redirect('/admin/profile');
	});
});
router.get('/administrative',function(request,response){
	response.render('admin/administrativeindex');

});
router.get('/customer',function(request,response){
	adminModel.getAll(function(results){
		response.render('admin/delatecustomer',{users:results});
	})

});
router.post('/customer',function(request,response){
	user={
		id:request.body.customerid,
	}
	adminModel.getByIdcustomer(user,function(results){
		response.render('admin/delatecustomer',{users:results});
	})

});
router.get('/deletecustomer/:id',function(request,response){
	adminModel.delete(request.params.id,function(status){
		if(status)
		{
			response.redirect('/admin/customer');
		}
	})
})
router.get('/medicine',function(request,response){
	adminModel.getAllmedicine(function(results){
		
		response.render('admin/medicine',{users:results});
		
	})
})
router.post('/medicine',function(request,response){
	user={
		id:request.body.medicineid,
	}
	adminModel.getIdMedicine(user,function(results){
		
		response.render('admin/medicine',{users:results});
		
	})
})
router.get('/addmedicine',function(request,response){
	
		
		response.render('admin/addmedicine');
		
	
})
router.get('/deletemedicine/:id',function(request,response){
	
		adminModel.deleteMedicine(request.params.id,function(status){
			response.redirect('/admin/medicine');
		})	

})
router.post('/addmedicine',function(request,response){
	user={
		name:request.body.name,
		vendor:request.body.vendor,
		type:request.body.type,
		category:request.body.category,
		price:request.body.price,
		amount:request.body.amount,
	}
	if(user)
adminModel.InsertMedicine(user,function(status){
	if(status)
	{
		response.redirect('/admin/medicine');
	}})
	

})
router.get('/allmedicine',function(request,response){
	response.redirect('/admin/medicine');
})

router.get('/updatemedicine/:id',function(request,response){

	adminModel.getIdMedicineUpdate(request.params.id,function(results){
		
		response.render('admin/updatemedicine',results);
	})	

})
router.post('/updatemedicine/:id',function(request,response){
		user={ 
			id:request.params.id,
			name:request.body.name,
			vendor:request.body.vendor,
			price:request.body.price,
			amount:request.body.amount,
		};
		console.log('update',user)
	adminModel.updateMedicine(user,function(status){
		console.log('update',status)
		if(status)
		{
			response.redirect('/admin/medicine');
		}
		
	})	

})


module.exports=router;
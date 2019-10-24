var express = require('express');
var db = require('../models/db');
var router = express.Router();
router.get('/', function(request, response){

		if(request.cookies['username'] != null){
			response.render('home/index');		
		}else{
			response.redirect('/logout');
		}	
});
module.exports = router;
router.get('/',(req,res)=>{
    res.render('home/homepage');
});
module.exports=router;
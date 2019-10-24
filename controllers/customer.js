var express = require('express');
var router = express.Router();
router.get('/',(req,res)=>{
		if(req.cookies['username'] != null){
			res.render('customer/customer');		
		}else{
			res.redirect('/logout');
		}	
});
module.exports = router;
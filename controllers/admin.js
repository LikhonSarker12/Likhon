var express = require('express');
var router = express.Router();
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
module.exports = router;
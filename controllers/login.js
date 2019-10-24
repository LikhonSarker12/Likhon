var db=require('./../models/db');
var express=require('express');
var router=express.Router();
var usermodel=require('./../models/usermodel');

router.get('/',(req,res)=>{
    res.render('login/login');
});

router.post('/',(req,res)=>{
    var userobj={
        username: req.body.username,
        password: req.body.password
    }
    usermodel.validate(userobj,(exist,status)=>{
        if(exist){
            res.cookie('username', req.body.username);
            if(status==1)
			{

            }
            else if(status==2){

            }
            else if(status==3){

            }
		}else{
			res.send('invalid username/password');		
		}
    });

});

module.exports=router;
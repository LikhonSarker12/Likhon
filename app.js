var express=require('express');
var ejs=require('ejs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({ dest: '/tmp/' });
var port = 900;
var app=express();
var admin=require('./controllers/admin');
var customer=require('./controllers/customer');
var login =require('./controllers/login');
var logout=require('./controllers/logout');
var registration=require('./controllers/registration');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/admin',admin);
app.use('/customer',customer);
app.use('/',login);
app.use('/login',login);
app.use('/logout',logout);
 app.use('/registration',registration);


app.get('/',(req,res)=>{
    res.render('login/loginpage');
});

app.listen(port, ()=>{
    console.log('app is running in port: '+port.toString());
});

const express = require("express")
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');

//controller
const newPostController = require('./controllers/newPost');
const homeController  = require('./controllers/home');
const getPostController = require ('./controllers/getPost');
const storePostController  =require ('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

//middleware
const authMiddleware = require('./middleware/authMiddleware');
const validateMiddleware  =require('./middleware/validationMiddleware');
const redirectifauthenMiddleware = require('./middleware/redirectifauthenMiddleware');

//file upload Package
const fileUpload = require('express-fileupload');
const res = require("express/lib/response");


mongoose.connect('mongodb+srv://kotchamon:1234@cluster0.mkf4t.mongodb.net/my_database',{ useNewUrlParser: true});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload());
app.use('/posts/store',validateMiddleware);
app.use(expressSession({
    secret: 'nodejsblog',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());

global.loggedIn = null;

app.use('*',(req,res,next) => {
    loggedIn = req.session.userId;
    next();
})

//HomePage
app.get('/',homeController);
//get Post
app.get('/post/:id',getPostController);
//New POst
app.get('/posts/new',authMiddleware,newPostController);
//new Register
app.get('/auth/register',redirectifauthenMiddleware, newUserController);
//Login
app.get('/auth/login',redirectifauthenMiddleware,loginController);
//logout 
app.get('/auth/logout',logoutController);

//Create Data
app.post('/posts/store',authMiddleware,storePostController);    
//Create user
app.post('/users/register',redirectifauthenMiddleware ,storeController);
//User login
app.post('/users/login',redirectifauthenMiddleware, loginUserController);



//404 not found
app.use((req, res) => res.render('notfound'));

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}

app.listen(port, () =>{
    console.log('App listen on port 4000')
})
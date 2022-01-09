const express = require("express")
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const newPostController = require('./controllers/newPost');
const homeController  = require('./controllers/home');
const getPostController = require ('./controllers/getPost');
const storePostController  =require ('./controllers/storePost');
const validateMiddleware  =require('./middleware/validationMiddleware');

//file upload Package
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb://localhost/my_database',{ useNewUrlParser: true});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload());
app.use('/posts/store',validateMiddleware);

app.get('/',homeController);


//get Post
app.get('/post/:id',getPostController);


//New POst
app.get('/posts/new',newPostController);


//Create Data
app.post('/posts/store',storePostController)    



app.listen(4000, () =>{
    console.log('App listen on port 4000')
})
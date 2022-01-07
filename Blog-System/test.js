const mongoose =require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

BlogPost.create({
    title: 'This is post 1',
    body: "Guidehandome"
}(error, blogpost) =>{
    console.log(error, blogpost);
})
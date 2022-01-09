const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

// BlogPost.create({
//     title: 'This is post 1',
//     body: 'Guidehandome'
// },(error, blogpost) =>{
//     console.log(error, blogpost);
// })

 let id= "61d877c93a5827c53c8551bd";
BlogPost.findByIdAndDelete(id
 ,(error, blogpost) => {
    console.log(error, blogpost)
})
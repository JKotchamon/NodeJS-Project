const Blogpost =require('../models/BlogPost');

module.exports = async (req, res) =>{
    const blogposts = await Blogpost.findById(req.params.id);
    if (req.session.userId){
        return res.render('editpost',{
            blogposts
        });
    }
    res.redirect('/auth/login');
}
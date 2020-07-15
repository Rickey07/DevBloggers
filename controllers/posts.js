const express = require('express');
const router  = express.Router();
const Post = require('../models/post');
const Category = require('../models/category');

router.get('/new' , async (req ,res) => {
    try {
        const post = await new Post();
        const categories = await Category.find({});
        res.render('posts/new' , { post: post , categories:categories })
    } catch (e) {
        console.log(e);
    }
});

router.get('/' , async (req , res) => {
   let posts = await Post.find({}).populate('category').exec();
   res.render('posts/index' , {posts: posts});
})

router.get('/:id/edit' , async ( req ,res ) => {
    try {
        const post = await Post.findById(req.params.id);
        const categories = await Category.find({});
        res.render('posts/edit' , {post: post , categories: categories});

    } catch (e) {

        console.log(e);
    }
})

router.get('/:slug' , async (req , res) => {
    try {
        const post = await Post.findOne({slug:req.params.slug});
        if(post == null) res.redirect('/');
        res.render('posts/show' , {post: post})
    } catch (e) {
        console.log(e)
    }
})

router.post('/' , async (req , res , next) => {
    req.post = new Post();
    next()
} , saveArticleAndRedirect('new'))

router.put('/:id' , async (req ,res , next) => {
    req.post = await Post.findById(req.params.id);
    next()
 } , saveArticleAndRedirect('edit')); 

router.delete(':id' , async (req , res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/')
});

function saveArticleAndRedirect (path) {
    return async (req , res) => {
        let post = req.post;
        post.title = req.body.title;
        post.description = req.body.description;
        post.markdown = req.body.markdown;
        post.category = req.body.category;
        try {
            post = await post.save();
            res.redirect(`/posts/${post.slug}`)
        } catch (e) {
            console.log(e);
            res.render(`/posts/${path}` , {post: post});
        }

    }
}
module.exports = router;
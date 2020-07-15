const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/' , async (req , res) => {
    try {
        const categories = await Category.find({});
        if (categories) {
            res.render('category/index' , { categories: categories , title:'Categories' } )
        } else {
            res.render('category/index' ,  { error: 'No Categories created Yet! Admin' } )
        }
    } catch (e) {
        console.log(e);
        res.status(500).render('category/index' , { internalErr: 'Internal Server Error' })
    }
});


router.get('/new' , (req ,res) => {
    res.render('category/new' , {title: 'New Category'})
})

router.post('/' , async (req , res) => {
    try { 
        if (req.body.name == null) {
            res.render('category/new' , {errorname:'Please enter an name'})
        } else {
            const newCategory = new Category(req.body);
            await newCategory.save();
            res.redirect('/categories');
            console.log('saved successfully')
        }
    } catch (e) {
        console.log(e);
    }
});
 
router.get('/:id/edit' , async (req , res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.render('category/edit' , {category: category , title: `Edit ${category.name}`});
        } else {
            res.render('category/edit' , {errormsg: 'Error While editing the category'})
        }

    } catch (e) {
        console.log(e);
    }
})

router.put('/:id/edit' , async (req , res) => {
    try {
        const category = await Category.findById(req.params.id);
        category.name = req.body.name;
        await category.save();
        res.redirect('/categories');
    } catch (e) {
        console.log(e);
    }
});

router.delete('/:id/edit' , async (req ,res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        res.redirect('/categories');
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
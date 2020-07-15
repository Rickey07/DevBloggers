const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window )
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength:32
    } , 

    description: {
        type:String,
        required:true,
        maxlength:100
    } , 

    markdown: {
        type:String,
        required:true,
        maxlength:500,
    } , 

    slug: {
        type:String,
        required:true,
        unique:true,
    } , 

    sanitizedHtml: {
        type:String,
        required:true
    } ,

    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    } ,

    createdAt: {
        type:Date,
        default:Date.now()
    } , 
    
    comments: []
})

postSchema.pre('validate' , function(next) {
    if(this.title) {
        this.slug = slugify(this.title , {lower:true , strict:true})
    }

    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next();
});

module.exports = mongoose.model('post' , postSchema);
require('dotenv').config();
const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');


// Set View Engine
app.set('view engine' , 'ejs');

// Static Files serving 
app.use(express.static('public'));

// expressejslayouts
// app.use(expressEjsLayouts('layouts/layouts'));

// body parser
app.use(bodyParser.urlencoded({extended: false}));

//cookie parser
app.use(cookieParser());

// methodoverride
app.use(methodOverride('_method'))

// Database connection
mongoose.connect(process.env.DATABASE_URL ,{useNewUrlParser:true , useUnifiedTopology: true , useCreateIndex: true})
.then(data => console.log(`Connected to database`))
.catch(err => console.log(`Error Occured at db ${err}`));


// Import all routes
const categoriesRouter = require('./controllers/categories');
const postRouter = require('./controllers/posts');

// Use all routes
app.use('/categories' ,  categoriesRouter);
app.use('/posts' , postRouter);
app.listen(process.env.PORT || 80 , () => {
    console.log(`Server Started`)
})
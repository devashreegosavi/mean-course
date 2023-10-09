const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const Post = require('./models/post');
const userRoutes = require('./routes/user');
const app = express();
var cors = require('cors');
//"mongodb+srv://devashreenic:POWkc5128wUkYJac@cluster0.t18appb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect('mongodb://localhost:27017/myapp')
    .then(()=>{
        console.log('Connected to database')
    })
    .catch(()=>{
        console.log('Connection Failed')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use("/images",express.static(path.join("backend/images")));
app.use(cors());
/*app.use((req,res,next)=>{
    console.log('First middleware');
    next();
});

app.use((req,res,next)=>{
    res.send('hello from express');
});*/


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Method",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

/*app.post('/api/posts',(req,res,next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message : 'Post added Successfully'
    });
});*/



/*app.use('/api/posts',(req,res,next)=>{
    const posts = [
        { 
            id : '1111',
            title : 'First server side post title',
            content : 'first server side post content'
        },
        { 
            id : '2222',
            title : 'Second server side post title',
            content : 'second server side post content'
        }
    ];

    res.status(200).json({
        message : 'Posts Fetched Successfully',
        posts : posts
    });
});
*/


app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
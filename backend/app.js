const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();

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
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Method",
        "GET, POST, PATCH, DELETE, OPTIONS"
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

app.post('/api/posts',(req,res,next) => {
    const post = new Post({
        title : req.body.title,
        content : req.body.content
    });
    console.log(post);
    post.save().then(createdPost=>{
        res.status(201).json({
            message : 'Post added Successfully',
            postId : createdPost._id
        });
        //console.log(createdPost);
    });
    
});


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

app.get("/api/posts", (req, res, next) => {
    Post.find().then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
  });

  app.delete("/api/posts/:id", (req,res,next)=>{
    Post.deleteOne({_id : req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message : 'Post Deleted!'});
    })
    console.log(req.params.id);
    
  });

  

module.exports = app;
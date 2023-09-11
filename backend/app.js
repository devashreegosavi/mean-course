const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.post('/api/posts',(req,res,next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message : 'Post added Successfully'
    });
});
app.use('/api/posts',(req,res,next)=>{
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

module.exports = app;
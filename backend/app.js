const express = require('express');

const app = express();

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
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Method",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
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
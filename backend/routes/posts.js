const express = require("express");
const multer = require("multer");
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require("../middleware/check-auth");
const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
};
const storage = multer.diskStorage({
    destination : (req,file,cb) => { //cb = callback
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid MIME type");
        if(isValid){
            error = null;
        }
        cb(error, "backend/images");
    },
    filename : (req,file,cb) => {
        const name = file.originalname.toLowerCase().split(' ').join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post(
    "",
    checkAuth,
    multer({storage : storage}).single("image"),(req,res,next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title : req.body.title,
        content : req.body.content,
        imagePath : url + "/images/" + req.file.filename,
        creator : req.userData.userId
    });
    //console.log(req.userData);
    //return res.status(200).json({});
    console.log(post);
    post.save().then(createdPost=>{
        res.status(201).json({
            message : 'Post added Successfully',
            post : {
                ...createdPost,
                id: createdPost._id,
            }
        });
        //console.log(createdPost);
    });
    
});

router.put(
    "/:id",
    checkAuth,
    multer({storage : storage}).single("image"), (req,res,next) => {
    //console.log(req.file);
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath : url + "/images/" + req.file.filename
    }
    const post = new Post({
        _id : req.body.id,
        title: req.body.title,
        content : req.body.content,
        imagePath : imagePath,
        creator : req.userData.userId
    });
    console.log(post);
    Post.updateOne({_id: req.params.id, creator : req.userData.userId}, post).then(result => {
        //console.log(result);
        if(result.modifiedCount > 0){
            res.status(200).json({message : 'Update Successful!'});
        }else{
            res.status(401).json({message : 'Not Authorized!'});
        }
    })
});

router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if(pageSize && currentPage){
        postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
            
    }
    console.log(req.query);
    postQuery.then(documents => {
        fetchedPosts = documents;
        return Post.count();
    })
    .then(count => {
        res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts : count
      });
    })
  });

  router.get("/:id", (req,res,next) => {
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message : 'Post not found.'})
        }
    });
  });
  router.delete("/:id",checkAuth, (req,res,next)=>{
    Post.deleteOne({_id : req.params.id, creator : req.userData.userId}).then(result => {
        //console.log(result);
        //res.status(200).json({message : 'Post Deleted!'});
        if(result.modifiedCount > 0){
            res.status(200).json({message : 'Deletion Successful!'});
        }else{
            res.status(401).json({message : 'Not Authorized!'});
        }
    })
    console.log(req.params.id);
    
  });


  module.exports = router;

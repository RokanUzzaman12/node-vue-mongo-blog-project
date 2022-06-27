const asyncHandler = require('../asyncHandler/asyncHandler');
const postModel = require('../models/postModel')
const {validationResult} = require('express-validator');

exports.createPost = asyncHandler(async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }
    
        const {title,content,author}=req.body
        console.log(req.body)
        if(req.file){
            console.log(req.file)
             postImage = req.file.filename
        }else{
            postImage = " "
        }
        const addPost = new postModel({
            title,
            content,
            author,
            postImage
        })
         await addPost.save()

         const data = await postModel.findById(addPost._id).populate({path:'author'});
        res.status(200).send({
            type:"success",
            msg:"Post Created Successfully",
            data:data
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Server error"
        })
    }

})

exports.fetchAllPost = asyncHandler(async(req,res,next)=>{
    try{

        const data = await postModel.find({}).sort({created:-1})
        .populate({path:'author'})
        res.status(200).send({
            type:'success',
            msg:"All posts Fetch Successfully",
            data:data
        })
        

    }catch(err){
        console.log(err)
        res.status(5000).send({
            msg:"Server Error"
        })
    }
})

exports.singlePost = asyncHandler(async(req,res,next)=>{
    try{
        const _id = req.params.id
        const data = await postModel.findById(_id).populate({path:'author'})
        res.status(200).send({
            type:'success',
            msg:"Single data Fatch succfully",
            data:data
        })
    }catch(err){
        console.log('err')
        res.status(500).send({
            msg:"Server error"
        })
    }
})

exports.updatePosts = asyncHandler(async(req,res,next)=>{
    try{
        const _id = req.params.id
        const updateData = await postModel.findById(_id);

        const {title,content,author}=req.body
        if(req.file){
            console.log(req.file)
             postImage = req.file.filename
        }

        updateData.title = title;
        updateData.content =content;
        updateData.author= author;
        updateData.postImage = postImage;
        updateData.updated = Date.now();

        await updateData.save();

        const data = await postModel.findById(updateData._id).populate({path:'author'});

        res.status(200).send({
            type:"success",
            msg:"Post updated Successfully",
            data:data
        })
        
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:'Server error'
        })
    }
})

exports.deletePost = asyncHandler(async(req,res,next)=>{
    try{
        const _id = req.params.id
        const data = await postModel.findByIdAndDelete(_id);
        res.status(200).send({
            type:"success",
            msg:"Post Deleted Successfully",
            data:data
        })
    }catch(err){
        console.log(err)
        res.status(200).send({   
            msg:"Server Error",
        })
    }

})
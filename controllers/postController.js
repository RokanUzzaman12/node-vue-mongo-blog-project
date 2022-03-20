const asyncHandler = require('../asyncHandler/asyncHandler');
const postModel = require('../models/postModel')
const {validationResult} = require('express-validator');

exports.createPost = asyncHandler(async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }
    
        const {title,content,author,}=req.body
        const addPost = new postModel({
            title,
            content,
            author
        })
         await addPost.save()

         const data = await postModel.findById(addPost._id).populate('author');
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
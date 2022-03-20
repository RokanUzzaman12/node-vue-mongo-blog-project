const asyncHandler = require('../asyncHandler/asyncHandler');
const usersSchema = require('../models/userModel')
const {validationResult} = require('express-validator');





exports.createUser = asyncHandler(async(req,res,next)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }
        
        const {userName,email,password} = req.body;
        if(req.file){
            console.log(req.file)
             profilePicture = req.file.filename
        }
        const addUser = new usersSchema({
            userName,
            email,
            password,
            profilePicture
        });
    
        const data = await addUser.save();
    
        res.status(200).send({
            type:'success',
            msg:'User added Susseccfully',
            data:data
        })
    }catch(err){
        res.status(500).send({
            msg:'Server Error'
        })
    }
})

exports.fatchAlluser = asyncHandler(async(req,res,next)=>{
    try{
        const data = await usersSchema.find({}).sort({created: -1});
        res.status(200).send({
            type:'success',
            data:data
        })
    }catch(err){
        res.status(500).send({
            msg:'Server Error'
        })
    }
})

exports.updateUser = asyncHandler(async(req,res,next)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }

        const {userName,email,password} = req.body;
        if(req.file){
            console.log(req.file)
            profilePicture = req.file.filename
        }

        const _id = req.params.id
        console.log(_id);

        let updateUser = await usersSchema.findById(_id)
        updateUser.userName = userName;
        updateUser.email = email;
        updateUser.password = password;
        updateUser.profilePicture = profilePicture;

        updateUser.updated = Date.now();
         
        const data = await updateUser.save()
        

        res.status(200).send({
            type:'success',
            msg:"User Details update successfully ",
            data:data

        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"server errore"
        })
    }
})

exports.singleUser = asyncHandler(async(req,res,next)=>{
    try{
        const _id = req.params.id
        const data = await usersSchema.findById(_id)
        res.status(200).send({
            type:"success",
            msg:"User find by id",
            data:data
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Server error"
        })
    }
})

exports.deleteUser = asyncHandler(async(req,res,next)=>{
    try{
        const _id = req.params.id
        const data = await usersSchema.findByIdAndDelete(_id)
        res.status(200).send({
            type:'success',
            msg:'User Deleted successfully',
            data:data
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Server Error"
        })
    }
})
const asyncHandler = require("../asyncHandler/asyncHandler")
const categoryModel = require("../models/categoryModel")
const {validationResult} = require('express-validator');
const { send } = require("express/lib/response");


exports.createCategory = asyncHandler(async(req,res,next)=>{
    
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }

        const {categoryName} = req.body
        const addCategory = new categoryModel({
            categoryName
        })
        const data = await addCategory.save()

        res.status(200).send({
            type:'success',
            msg:"New Category added Successfully",
            data:data
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Server Error"
        })
    }
})


exports.fetchAllCategory = asyncHandler(async(req,res,next)=>{
    try{
        const data = await categoryModel.find({}).sort({created:-1});
        res.status(200).send({
            type:"success",
            msg:"All data Fetched Successfully",
            data:data
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Server Error"
        })
    }
})

exports.updateCategory = asyncHandler(async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }
        
        const _id = req.params.id

        const editCategory = await categoryModel.findById(_id);

        const {categoryName} = req.body

        editCategory.categoryName = categoryName;
        editCategory.updated = Date.now()

        const data = await editCategory.save();

        res.status(200).send({
            type:'success',
            msg:'Category Updated Successfully',
            data:data

        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            msg:"Server Error"
        })
    }
})

exports.deleteCategory = asyncHandler(async(req,res,next)=>{
    try{
        const _id = req.params.id
        const data = await categoryModel.findByIdAndDelete(_id)
        res.status(200).send({
            type:'success',
            msg:"Category Deleted Successfully ",
            data:data
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Server Error"
        })
    }

    
})
const asyncHandler = require('../asyncHandler/asyncHandler');
const usersSchema = require('../models/userModel')
const {validationResult} = require('express-validator');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const { type } = require('express/lib/response');





exports.createUser = asyncHandler(async(req,res,next)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({errors:errors.array()})
        }
        
        const {userName,email} = req.body;
        bcrypt.hash(req.body.password, 10, async (err, hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                });
            }else{

                if(req.file){
                    console.log(req.file)
                     profilePicture = req.file.filename
                }else{
                    profilePicture = ''
                }
                const addUser = new usersSchema({
                    userName,
                    email,
                    password:hash,
                    profilePicture
                });
            
                const data = await addUser.save();
            
                res.status(200).send({
                    type:'success',
                    msg:'User added Susseccfully',
                    data:data
                })

            }
        })

    }catch(err){
        res.status(500).send({
            msg:'Server Error'
        })
    }
})

exports.loginUser = asyncHandler(async(req,res,next)=>{
    try{
        let result = await usersSchema.findOne({email:req.body.email})
        
        if(result){
            
            bcrypt.compare(req.body.password,result.password,(error,response)=>{
                
                if(response){
                    let token = jwt.sign({
                        email:result.email,
                        userName: result.userName,
                        userId:result._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:'1h'
                    })
                    res.status(200).send({
                        type:'success',
                        msg:'welcome to our website',
                        token:token,
                        data:result
                    })
                }else{
                    res.status(402).send({
                        type:'wrong password',
                        msg:"your password is not correct"
                    })
                }
            })
        }else{
            res.status(401).send({
                type:"email not exist",
                msg:"email doesn't exist"
            })
        }
    }catch(err){
        res.status(500).send({
            msg:"server error"
        })
    }
         
})

exports.verifyUser = asyncHandler(async(req,res,next)=>{


    try{
        let user = null;
        const {authorization} = req.headers;
         const token = authorization.split(' ')[1];
     
        console.log('good');
        jwt.verify(token,'secrate',(err,decode)=>{
           if(err){
               return res.status(400).send(err)
           }else{
                 user = decode. userId
 
           }

       })

       let userData = await usersSchema.findById(user)
       res.status(200).send({
        type:'success',
          data: userData
     })

    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Server Error"
        })
    }
})


// exports.setUserInfo = asyncHandler(async(req,res,next)=>{
//     try{
//         let token = req.headers.token
//         jwt.verify(token,'secrate', (error,decoded)=>{
//             if(error){
//                 res.status(400).send({
//                     msg:"verify error"
//                 })
//             }
//             else{
                
//                usersSchema.findOne({_id : decoded.userId},(err,user)=>{
//                    if(err){
//                        console.log(err)
//                    }
//                    else{
//                        console.log(user);
                                      
//                         res.status(200).send({
//                             type:'success',
//                             msg:'user is set',
//                             data:user
//                         })
//                    }
//                })

//             }
//         })
//     }catch(err){
//         res.status(500).send({
//             msg:'server Error'
//         })
//     }
// })

exports.fatchAlluser = asyncHandler(async(req,res,next)=>{
    try{
        // console.log(req.userInfo);
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
const express = require('express')
const router = express.Router()
const usersSchema = require('../models/userModel')
const {createUser,fatchAlluser,updateUser,singleUser,loginUser,deleteUser,verifyUser} = require('../controllers/userController');
const {check} = require('express-validator')
const checkLogin = require('../middleware/checkLogin')

const upload = require('../middleware/upload')

router.post('/users',upload.single('profilePicture'),[
    check('userName',"User Name Should not be Empty").not().isEmpty(),
    check('email'," Email Should not be Empty").not().isEmpty().custom(async (email) => {
        const existingUser = 
            await usersSchema.findOne({ email })
              
        if (existingUser) {
            throw new Error('Email already in use')
        }
    }),
    check('password',"Password Should not be Empty").not().isEmpty(),
    
],createUser);

router.get('/users',checkLogin,fatchAlluser);

router.put('/users/:id',upload.single('profilePicture'),[
    check('userName',"User Name Should not be Empty").not().isEmpty(),
    check('password',"Password Should not be Empty").not().isEmpty(),
],updateUser)

router.get('/users/:id',singleUser)
// router.get('/user',setUserInfo)
router.post('/users/login',loginUser)

router.get('/user-verify',verifyUser)

router.delete('/users/:id',deleteUser)

module.exports = router;
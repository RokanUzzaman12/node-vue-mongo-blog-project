const express = require('express')
const router = express.Router()
const usersSchema = require('../models/userModel')
const {createUser,fatchAlluser,updateUser,singleUser,deleteUser} = require('../controllers/userController');
const {check} = require('express-validator')

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

router.get('/users',fatchAlluser);

router.put('/users/:id',upload.single('profilePicture'),[
    check('userName',"User Name Should not be Empty").not().isEmpty(),
    check('password',"Password Should not be Empty").not().isEmpty(),
],updateUser)

router.get('/users/:id',singleUser)

router.delete('/users/:id',deleteUser)

module.exports = router;
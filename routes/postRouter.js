const express = require('express')
const router = express.Router()
const {createPost} = require('../controllers/postController')
const {check} = require('express-validator')

router.post('/posts',[
    check('title',"Title is required")
],createPost)

module.exports = router

const express = require('express')
const router = express.Router()
const {createPost,fetchAllPost,singlePost,updatePosts,deletePost} = require('../controllers/postController')
const {check} = require('express-validator')
const upload = require('../middleware/upload')

router.post('/posts',upload.single('postImage'),[
    check('title',"Title is required")
],createPost)

router.get('/posts',fetchAllPost);

router.get('/posts/:id',singlePost)

router.put('/posts/:id',upload.single('postImage'),[
    check('title',"Title is required")
],updatePosts)

router.delete('/posts/:id',deletePost)

module.exports = router

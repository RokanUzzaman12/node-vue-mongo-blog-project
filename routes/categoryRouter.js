const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const {createCategory,fetchAllCategory,updateCategory,deleteCategory} = require('../controllers/categoryController')

router.post('/categories',[
    check('categoryName', "Category Name is required").not().isEmpty()
],createCategory)

router.get('/categories',fetchAllCategory)

router.put('/categories/:id',[
    check('categoryName', "Category Name is required").not().isEmpty()
],updateCategory)

router.delete('/categories/:id',deleteCategory)

module.exports = router
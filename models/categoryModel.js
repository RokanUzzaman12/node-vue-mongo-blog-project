const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = Schema({
    categoryName:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now()
    },
    updated:{
        type:Date,
        default:Date.now()
    }
})

const categoryModel = mongoose.model('category',categorySchema);
module.exports = categoryModel
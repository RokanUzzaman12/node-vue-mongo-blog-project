const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        default:'',
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postImage:{
        type:String,
        default:''
    },
    created:{
        type:Date,
        default: Date.now
    },
    updated:{
        type:Date,
        default: Date.now
    }
})

const postModel = mongoose.model('post',postSchema)
module.exports = postModel
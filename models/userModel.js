const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
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

const usersSchema = mongoose.model('User',userSchema)

module.exports = usersSchema;
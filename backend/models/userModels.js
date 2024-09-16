const mongoose = require('mongoose')
const validator = require('validator')

//name email,password,images,videos,passwordConfirm
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name!']

    },
    email:{
        type:String,
        required:[true,'Please provide your email!'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valida email']
    },
    images:String,
    videos:String,
    password:{
        type: String,
        required: [true,'Please provide a password!'],
        minlength:8
    },
    passwordConfirm:{
        type: String,
        required: [true,'Please provide a password!'],
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;
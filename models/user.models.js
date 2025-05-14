const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // username: String,
    // email:String,
    // password:String

    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [3,"Username must be at least 3 char long"]
    },

    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [13, "Email must be at least 13 char long"]
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [5, "Password must be at least 13 char long"]
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user;

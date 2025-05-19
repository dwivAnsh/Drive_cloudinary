// File model schema 
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'File path is required']
    },
    originalName: {
        type: String,
        required: [true, 'File original name is required']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, // user id
        ref: 'users',
        required: [true, 'User id is required']
    }
});

const file = mongoose.model('files', fileSchema);
module.exports = file;

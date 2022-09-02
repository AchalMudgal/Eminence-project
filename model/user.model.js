const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique :  true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 8,
        unique  : true
    },
    cretedAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    }
});

module.exports = mongoose.model('user', userSchema);
const mongoose = require('mongoose');

const user1Schema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true,
        index:{
        unique:true,
        },
    },
    email:{
        type: String,
        required : true,
        index:{
            unique:true,
            },
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
    type:String
    },
    date:{
        type:Date,
        default: Date.now
    },
    confirmPassword:{
    type:String
    }
    
})

module.exports = mongoose.model('user1', user1Schema)
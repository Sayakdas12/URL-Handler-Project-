// set up data base Schema table  set a critaria 

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true, 
    },

}, {timestamps: true});  // timestampe use for to track when data was created, modified, or accessed

const User = mongoose.model("user", userSchema);

module.exports = User;

// set up data base Schema table 
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
shortId: {
    type: String,
    require: true,
    unique: true,

},
redirectURL:{
    type: String,
    require: true,
},

visitHistory: [{timestamps: {type: Number}}],  // array object


}, {timestamps: true});

const URL = mongoose.model("url", urlSchema );

module.exports = URL;
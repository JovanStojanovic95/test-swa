const mongoose = require('mongoose');


const profaSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId, // auto moongse create id
    email : {
        type : String,
        required: true, 
        unique: true,  // not valid but make speed for quering
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        // up for not screwed around must be email not only sttring!!
    },
    userName: { type: String, required: true, unique: true },
    password : { type : String, required : true },
    firstName: { type : String, required : true },
    lastName: { type : String, required : true },
    userImage: { data: Buffer, contentType: String , required: false },
   // eduBackGround : { type: String, required: false }, // education background
   // availability : { type: String, required: false }, // home or at your place
    /// location ? array >>> select box for locations ???
    ///kvalification
    subjects : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: false 
    }]
});

module.exports = mongoose.model('Profa' , profaSchema);
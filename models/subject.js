const mongoose = require('mongoose');


const subjectSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId, // auto moongse create id
    name: { type: String, required: true },
    category : { type: String, required: true},
    profa: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Profa', required: false 
    }]
});

module.exports = mongoose.model('Subject' , subjectSchema);
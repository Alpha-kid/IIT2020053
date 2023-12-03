const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdSchema = new Schema({
    results : {
        type : Object,
        required : true
    },

    timeStamp : {
        type : Date,
        default : Date.now(),
    },

    status : {
        type : Boolean,
        required : true
    },

    errorMsg : {
        type : String,
    }
});

module.exports = mongoose.model('id', IdSchema);
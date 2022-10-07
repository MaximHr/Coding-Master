const mongoose = require('mongoose');
const {Schema} = mongoose;

const fileSchema = new Schema({
    text: {
        type:String,
        required: true
    },
    language: {
        type: String
    },

});

const HomeWorkSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    lessonId: {
        type: String,
        required: true
    },
    isMarked: {
        type:Boolean,
        default: false
    },
    message: {
        type: String,
    },
    score: {
        type: Number
    },
    files: {
        type:[fileSchema]
    },
    seen: { 
        type: Number,
        default: 0
    }

});

const HomeWork = mongoose.model('Homework', HomeWorkSchema);
module.exports = HomeWork;
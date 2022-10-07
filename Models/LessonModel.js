const mongoose = require('mongoose');
const {Schema} = mongoose;


const lessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    whichCourse: {
        type: String,
        required: true
    },
    information: {
        type: String,
    },
    homework: {
        type: String
    },
    submissions: {
        type: Array
    }
});


const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
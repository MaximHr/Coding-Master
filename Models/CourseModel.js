const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teacher: {
      type: String,
      required: true
    },
    participants: {
      type: Number,
      default: 0
    }
})


const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    type: String,
    name: {
        type: String,
        required: true
    },
    teacher: {
      type: String,
      required: true
    }
})


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    courses: {
        type: [courseSchema],
        required: true
    },
    stars: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        required: true
    }

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
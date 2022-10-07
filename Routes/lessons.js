const express = require('express');
const router = express.Router();
const Lesson = require('../Models/LessonModel');

//get all lessons
router.get('/', async(req, res) => {
    try {
        let lessons = await Lesson.find();
        res.send(lessons);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

//get lessons by id
router.get('/:id', async(req, res) => {
    try {
        let lesson = await Lesson.findById(req.params.id);
        res.send(lesson);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

// get all by course
router.get('/course/:courseName', async(req, res) => {
    try {
        let lessons = await Lesson.find({whichCourse: decodeURIComponent(req.params.courseName)});
        res.send(lessons);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

//create a new course
router.post('/', async(req, res) => {
    const {title, date, whichCourse, information, homework, submissions} = req.body;
    try {
        let lesson = new Lesson({ title, date, whichCourse, information, homework, submissions });
        await lesson.save();
        res.send(lesson)

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

router.put('/:id', async(req, res) => {
    const {title, date, information, homework} = req.body;
    try {
        let lesson = await Lesson.findByIdAndUpdate(req.params.id, {
            title,
            date,
            information,
            homework
        }, {new: true})
        if(lesson) {
            await lesson.save();
            res.send(lesson)
        }

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

module.exports = router
const express =  require('express');
const router = express.Router();
const Course = require('../Models/CourseModel');

//get all courses
router.get('/', async(req, res) => {
    try {
        let courses = await Course.find();
        res.send(courses);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

//get a course by id
router.get('/:id', async(req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        res.send(course);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});
//get a course by its name
router.get('/name/:name', async(req, res) => {
    try {
        let course = await Course.findOne({name: decodeURIComponent(req.params.name)});
        res.send(course);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

//delete a course
router.delete('/:id', async(req, res) => {
    try {
        let course = await Course.findByIdAndDelete(req.params.id);
        res.send('Course Deleted');

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

//update a course
router.put('/:id', async(req, res) => {
    const {name, teacher, participants} = req.body;
    try {
        let course = await Course.findByIdAndUpdate(req.params.id, {name, teacher, participants}, {new: true});
        if(course) {
            await course.save();
            res.send(course)

        } else {
            return res.status(400).json({errors: [
                {msg: 'Course does not exists'}
            ]});
        }
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})
router.put('/addParticipant/:name', async(req, res) => {

    try {
        let getCourse = await Course.findOne({name: decodeURIComponent(req.params.name)});
        let course = await Course.findOneAndUpdate({name: decodeURIComponent(req.params.name)}, {
            participants: getCourse.participants + 1 
        }, {new: true});
        if(course) {
            await course.save();
            res.send(course)
        } else {
            return res.status(400).json({errors: [
                {msg: 'Course does not exists'}
            ]});
        }
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

//crete a course
router.post('/', async(req, res) => {
    const {name, teacher, participants} = req.body;
    try {
        let course = await Course.findOne({name: name});
        if(course) {
            return res.status(400).json({errors: [
                {msg: 'Course already exists'}
            ]});
        }
        course = new Course({name, teacher, participants});
        await course.save();
        res.send(course);

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});


module.exports = router;
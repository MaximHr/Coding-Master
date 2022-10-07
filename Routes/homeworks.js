const express = require('express');
const router = express.Router();
const Homework = require('../Models/HomeworkModel');
const User = require('../Models/UserModel');
const Lesson = require('../Models/LessonModel');


router.get('/:id', async(req, res) => {
    try {
        let homework = await Homework.findById(req.params.id);
        res.send(homework);

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

router.get('/user/:id', async(req, res) => {
    try {
        let homeworks = await Homework.find({userId: req.params.id});
        res.send(homeworks);

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});
router.get('/lesson/:id', async(req, res) => {
    try {
        let homeworks = await Homework.find({lessonId: req.params.id});
        let users = [];
        for(let i = 0;i < homeworks.length;i++) {
            users[i] = await User.findById(homeworks[i].userId);
        }
        res.send({homeworks, users});

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});


router.get('/calculateScore/:personId/:courseName', async(req, res) => {
    try {
        // const user = await User.findById(req.params.personId);
        let homeworks = await Homework.find({userId: req.params.personId});
        let lessons = [];
        let newHomeworks = [];
        let finalScore = 0;
        for(let i = 0;i < homeworks.length;i ++) {
            lessons[i] = await Lesson.findById(homeworks[i].lessonId);
        }
        for(let i = 0;i < lessons.length;i++) {
            if(lessons[i].whichCourse === decodeURIComponent(req.params.courseName)) {
                newHomeworks.push( await Homework.findOne({
                    userId: req.params.personId,
                    lessonId: lessons[i]._id
                }))
            }
        }
        for(let i = 0;i < newHomeworks.length;i++) {
            if(newHomeworks[i].score) {
                finalScore += newHomeworks[i].score;
            }
        }
        
        res.send({score: JSON.stringify(finalScore), id: req.params.personId})
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

router.get('/hasHomework/:lessonId/:personId', async(req, res) => {
    try {
        let homework = await Homework.find({userId: req.params.personId, lessonId: req.params.lessonId});
        if(homework.length) {   
            let user = await User.findById(homework[0].userId);
            res.send({hasHomework: true, user: user, homework: homework[0]});
        } else {
            res.send([]);
        }
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});


router.put('/seen/:id/', async(req, res) => {
    const seen = req.body;
    try {
        let homework = await Homework.findByIdAndUpdate(req.params.id, {
           seen: seen
        }, {new: true});
        if(homework) {
            await homework.save();
            res.send(homework)
        }

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

router.put('/marked/:id/', async(req, res) => {
    const {message, score} = req.body;
    try {
        let homework = await Homework.findByIdAndUpdate(req.params.id, {
            message,
            score,
            seen: 1,
            isMarked: true
        }, {new: true});
        if(homework) {
            await homework.save();
            res.send(homework)
        }

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

router.post('/', async(req, res) => {
    const {userId, lessonId, message, score, files} = req.body;
    try {
        let homework = new Homework({userId, lessonId, message, score, files});
        await homework.save();
        res.send(homework)
        
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        let homework = await Homework.findByIdAndDelete(req.params.id);
        res.send(homework);
        
    }catch(err) {
        consol.log(err.message);
        res.status(400).send(err);
    }
})


module.exports = router;
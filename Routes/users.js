const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');

// get all users
router.get('/', async(req, res) => {
    try {
        let users = await User.find();
        res.send(users);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

//get users based on their teacher
router.get('/teacher/:teacher', async(req, res) => {
    try {
        let users = await User.find({ "courses.teacher": 
         req.params.teacher})
        res.send(users);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

//get users based on their courses
router.get('/course/:course', async(req, res) => {
    try {
        let users = await User.find({ "courses.name": decodeURIComponent(req.params.course)})

        res.send(users);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

//get a user by id
router.get('/id/:id', async(req, res) => {
    try {
        let users = await User.findById(req.params.id);
        res.send(users);
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

//log in
router.get('/login/:name/:pass', async(req, res) => {
    try {
        let user = await User.findOne({name: req.params.name, password: req.params.pass});
        if(user) {
            res.send(user);
        } else {
            res.status(400).json({errors: [
                {msg: 'Wrong password or username'}
            ]});
        }
    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
})

//create a user
router.post('/', async (req, res) => {
    const {name,courses, password, stars, isAdmin} = req.body;
    try {
        let user = await User.findOne({name});
        if(user) {
            return res.status(400).json({errors: [
                {msg: 'User already exists'}
            ]});
        }
        user = new User({ name, courses, password, stars, isAdmin });
        await user.save();
        res.send(user)

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});


//update a user
router.put('/:id', async (req, res) => {
    const {name,courses, password, stars, isAdmin} = req.body;
    try {
        let user = await User.findByIdAndUpdate(req.params.id, {name,courses, password, stars, isAdmin}, {new: true})
        if(user) {
            await user.save();
            res.send(user);
        } else {
            return res.status(400).json({errors: [
                {msg: 'User does not exist'}
            ]});
        }

    }catch(err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});

module.exports = router;
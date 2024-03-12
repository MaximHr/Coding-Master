require('dotenv').config({path: __dirname + '/.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3001;
const cors = require('cors');

//connecting the database
mongoose.connect(
   'mongodb+srv://max_hristov:max123@cluster0.625d3cz.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log("Mongo connected");
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'web')));
app.use(cors());

//routes
app.use('/api/users', require('./Routes/users.js') );
app.use('/api/courses', require('./Routes/courses.js') );
app.use('/api/lessons', require('./Routes/lessons.js') );
app.use('/api/homeworks', require('./Routes/homeworks.js') );

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('web/build'));
  	app.get('*', (req, res) => {
    	res.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'))
  	})
}

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

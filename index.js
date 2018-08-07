// Setup
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Ejs view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Mongoose
mongoose.connect('mongodb://localhost:27017/simple-node-blog', { useNewUrlParser: true });

// Mongoose Schema
const postSchema = new mongoose.Schema({
	body: String
});

// Mongoose Model
const Post = mongoose.model('Post', postSchema);

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
	Post.find({}, (err, posts) => {
		res.render('index', {posts: posts});
	});
});

app.post('/addpost', (req, res) => {
	let postData = new Post(req.body);
	postData.save().then(result => {
		res.redirect('/');
	}).catch(err => {
		res.status(400).send('Unable to save data');
	});
});

// Listen
app.listen(3000, () => {
	console.log('Server listening on port 3000');
})
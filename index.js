// Setup
const express = require('express');
const ejs = require('ejs');

const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Routes
app.get('/', (req, res) => {
	res.render('index');
});

// Listen
app.listen(3000, () => {
	console.log('Server listening on port 3000');
})
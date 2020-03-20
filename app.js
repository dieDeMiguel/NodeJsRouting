// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const express = require('express')


const app = express() // initialize app

app.use((req, res, next) => {
	const timestamp = new Date();
	req.timestamp = timestamp.toString();
	next()
});

vertex.configureApp(app)
app.use(vertex.setContext(process.env))


// import routes
const index = require('./routes/index')
const api = require('./routes/api')
const register = require('./routes/register')

// set routes
app.use('/', index)
app.use('/api', api) // sample API Routes
app.use('/register', register)


module.exports = app
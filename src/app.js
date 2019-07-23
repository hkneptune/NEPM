// Dependencies
const express = require('express')
// Handle authentication
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

const models = require('./models')
// Setting up the port
const PORT = process.env.PORT || 45675

// Creating an express app and
// configuring middleware needed to read through our public folder
const app = express()
app.use(express.static('public'))

// For body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// For Passport
app.use(session({
  secret: 'This is a secret used in session',
  resave: true,
  saveUninitialized: true })); // Session secret
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions

// Database synchronization
models.sequelize.sync().then(() => {
  console.log('The database connection is fine!')
}).catch((err) => {
  console.log(err, "Something went wrong while connecting to the database!")
});

// Testing path
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Listen to and show all activities on terminal
app.listen(PORT, (err) => {
  console.log('> Project NEPM is listening on port ' + PORT + '!')
  console.log('-------------------------------------------------------')
})

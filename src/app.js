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

require('./config/passport/passport.js')(passport, models.users)

// Database synchronization
models.sequelize.sync().then(() => {
  console.log('The database connection is fine!')
}).catch((err) => {
  console.log(err, "Something went wrong while connecting to the database!")
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/user/login?login=0')
}

// Testing path
app.get('/', (req, res) => {
  let greeting = 'Hello World!'
  let member = '<a href="/user/login">Login</a>'
  if (req.user) {
    greeting = 'Hello ' + req.user.first_name + ' ' + req.user.last_name
    member = '<a href="/user/logout">Logout</a>'
  }
  res.send('<a href="/">Home</a><br /><a href="/user/register">Register</a><br />' + member + '<br />' + greeting + '!')
})

app.get('/user/register', (req, res) => {
  res.send('<a href="/">Home</a><br /><a href="/user/login">Login</a><br /><form id="signup" name="signup" method="post" action="/api/auth/signup"><label for="email">Email Address</label>&nbsp;<input class="text" name="email" type="email" /><br /><label for="first_name">First Name</label>&nbsp;<input name="first_name" type="text" /><br /><label for="last_name">Last Name</label>&nbsp;<input name="last_name" type="text" /><br /><label for="password">Password</label>&nbsp;<input name="password" type="password" /><br /><input class="btn" type="submit" value="Sign Up" /></form>')
})

app.get('/user/login', (req, res) => {
  res.send('<a href="/">Home</a><br /><a href="/user/register">Register</a><br /><form id="signin" name="signin" method="post" action="/api/auth/signin"><label for="email">Email Address</label>&nbsp;<input class="text" name="email" type="text" /><br /><label for="password">Password</label>&nbsp;<input name="password" type="password" /><br /><input class="btn" type="submit" value="Sign In" /></form>')
})

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.send('<a href="/user/logout">Logout</a>')
})

app.post('/api/auth/signup', passport.authenticate('local-signup', {
  successRedirect: '/?login=1',
  failureRedirect: '/user/register?fail=1'
}))

app.post('/api/auth/signin', passport.authenticate('local-signin', {
  successRedirect: '/?login=2',
  failureRedirect: '/user/login?fail=1'
}))

app.get('/user/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/?logout=1')
  })
})

// Listen to and show all activities on terminal
app.listen(PORT, (err) => {
  console.log('> Project NEPM is listening on port ' + PORT + '!')
  console.log('-------------------------------------------------------')
})

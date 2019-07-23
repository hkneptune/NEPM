// Dependencies
const express = require('express')

// Setting up the port
const PORT = process.env.PORT || 45675

// Creating an express app and
// configuring middleware needed to read through our public folder
const app = express()
app.use(express.static('public'))

// Testing path
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Listen to and show all activities on terminal
app.listen(PORT, (err) => {
  console.log('> Project NEPM is listening on port ' + PORT + '!')
  console.log('-------------------------------------------------------')
})

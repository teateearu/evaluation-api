// index.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('./config/auth')
const { batches, users, sessions, students, evaluations } = require('./routes')

const PORT = process.env.PORT || 3030


let app = express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  // Our routes
  .use(students)
  .use(users)
  .use(sessions)
  .use(batches)
  .use(evaluations)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    // only print full errors in development
    error: app.get('env') === 'development' ? err : {}
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

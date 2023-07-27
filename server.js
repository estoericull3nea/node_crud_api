require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/v1/tasks', require('./routes/tasks'))

// middleware for error handler
app.use(require('./middlewares/not_found'))
app.use(require('./middlewares/error_handler'))

// server config, first load the db then server
const start = async () => {
  try {
    await require('./db/connect')(process.env.MONGO_URI_COMPASS)
    app.listen(PORT, () => {
      console.log(`Server Running!`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()

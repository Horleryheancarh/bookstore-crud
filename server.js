// IMPORTS
// npm modules
const express = require('express')
const dotenv = require('dotenv').config()

// project modules
const dbSetup = require('./database/setup')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')


// PRESETS
const app = express()

// DATABASE
dbSetup()

// SEEDER
const seedAdmin = require('./services/seedAdmin')
console.log(typeof seedAdmin())

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require('./middlewares/logger'))


// ROUTES
app.use(bookRoutes)
app.use('/user', userRoutes)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my Bookstore API'})
})


// START SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
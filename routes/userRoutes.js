// IMPORTS
const express = require('express')
const router = express.Router()

const { registerUser, loginUser } = require('../controllers/userControllers')

// Register User
router.post('/signup', registerUser)

// Login User
router.post('/login', loginUser)

module.exports = router
// IMPORTS
const express = require('express')
const router = express.Router()

const { authenticateUser, checkIfAdmin } = require('../middlewares/auth')
const { createBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/bookControllers')

// Create a new book
router.post('/books', authenticateUser, checkIfAdmin, createBook)


// Get all books
router.get('/books', authenticateUser, getBooks)


// Get single book
router.get('/books/:id', authenticateUser, getBook)


// Update book
router.put('/books/:id', authenticateUser, checkIfAdmin, updateBook)


// Delete book
router.delete('/books/:id', authenticateUser, checkIfAdmin, deleteBook)


module.exports = router

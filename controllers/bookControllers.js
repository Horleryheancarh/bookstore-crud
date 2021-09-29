const Book = require('../models/book')

createBook = (req, res) => {
    Book.create({
        ...req.body
    }, (error, newBook) => {
        if (error) {
            return res.status(500).json({ message: error})
        } else {
            return res.status(201).json({ message: "new book created", newBook })
        }
    })
}


getBooks = (req, res) => {
    // Check for filters
    Book.find(req.query, (error, books) => {
        if (error) {
            return res.status(500).json({ message: error })
        } else {
            return res.status(200).json({ books })
        }
    })
}


getBook = (req, res) => {
    Book.findById(req.params.id, (error, book) => {
        if (error) {
            return res.status(500).json({ message: error })
        } else if (!book) {
            return res.status(404).json({ message: 'Book Not Found'})
        } else {
            return res.status(200).json({ book })
        }
    })
}


updateBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: req.body.category,
    }, (error, book) => {
        if (error) {
            return res.status(500).json({ message: error })
        } else if (!book) {
            return res.status(404).json({ message: 'Book Not Found' })
        } else {
            return res.status(200).json({ message: 'Book updated successfully' })
        }
    })
}


deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (error, book) => {
        if (error) {
            return res.status(500).json({ message: error })
        } else if (!book) {
            return res.status(404).json({ message: 'Book Not Found' })
        } else {
            return res.status(200).json({ message: 'Book Deleted Successfully' })
        }
    })
}


module.exports = { createBook, getBooks, getBook, updateBook, deleteBook }

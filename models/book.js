const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: [ 'Fiction', 'Non-Fiction', 'Comics', 'Others' ]
    },
    purchaseCount: {
        type: Number
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: Array
    },
    color: {
        type: String
    },
})

const Book = model('book', bookSchema)

module.exports = Book
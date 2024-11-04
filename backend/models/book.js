const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({ // modèle pour les notes des utilisateurs 
  userId: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  }
});

const bookSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  ratings: [ratingSchema],
  averageRating: {
    type: Number,
    default: 0
  }
})


const Book = mongoose.model('Book', bookSchema)
module.exports = Book;
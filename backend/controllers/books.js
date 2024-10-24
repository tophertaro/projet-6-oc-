const Book = require('../models/book'); 
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
  Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
};

exports.getBestRatedBooks = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 }) // trie les livres par note moyenne décroissante
    .limit(3) // limite à 3 résultats
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  book.save()
      .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
      .catch(error => res.status(400).json({ error }));
};

exports.updateBook = (req, res, next) => {
  const bookObject = req.file ?
  {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  
  Book.updateOne({ _id: req.params.id, userId: req.auth.userId }, { ...bookObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre modifié !' }))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
      .then(book => {
          if (book.userId !== req.auth.userId) {
              return res.status(403).json({ message: 'Unauthorized request' });
          }
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
                  .catch(error => res.status(400).json({ error }));
          });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.rateBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
      .then(book => {
          const userAlreadyRated = book.ratings.find(rating => rating.userId === req.auth.userId);
          if (userAlreadyRated) {
              return res.status(400).json({ message: 'User already rated this book' });
          }
          const newRating = {
              userId: req.auth.userId,
              grade: req.body.rating
          };
          book.ratings.push(newRating);
          book.averageRating = book.ratings.reduce((sum, rating) => sum + rating.grade, 0) / book.ratings.length;
          
          book.save()
              .then(() => res.status(201).json(book))
              .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(400).json({ error }));
};


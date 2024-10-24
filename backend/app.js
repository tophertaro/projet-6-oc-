const express = require('express'); // import express
const app = express(); // création de l'application express
const userRoutes = require('./routes/users')
const bookRoutes = require('./routes/books')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const path = require('path')


dotenv.config();

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes)

// connection à la bdd
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));



module.exports = app; // export de l'app 
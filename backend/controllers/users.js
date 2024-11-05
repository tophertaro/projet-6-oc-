const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Gestion inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) //hachage mdp
    .then(hash => {
      const user = new User({ //utilisateur crée avec l'email et mdp haché
        email: req.body.email,
        password: hash
      });
      user.save() // utilisateur enregistré dans bdd
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Gestion connexion
exports.login = (req, res, next) => {
  User.findOne({email: req.body.email}) //recherche utilisateur dans bdd par son email
    .then(user => {
      if(!user) {
        return res.status(401).json({message: 'Paire login/mot de passe incorrecte'})
      }
    bcrypt.compare(req.body.password, user.password) // compare mdp fourni avec celui dans la bdd
      .then(valid => {
        if(!valid) {
          return res.status(401).json({message: 'Paire login/mot de passe incorrecte'})
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            {userId: user._id},
            process.env.JWT_CODE,
            {expiresIn:'24h'}
          )
        });
      })
      .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}
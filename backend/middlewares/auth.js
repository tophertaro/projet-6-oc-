const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //récupération token
    const decodedToken = jwt.verify(token, process.env.JWT_CODE); //vérification token avec clée secrète
    const userId = decodedToken.userId;
    req.auth = { 
      userId: userId
    };
    next()
  } catch(error) {
    res.status(401).json({error})
  }
}
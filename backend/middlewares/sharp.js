const sharp = require('sharp')
const path = require ('path')
const fs = require('fs')

const resizeImg = (req, res, next) => {
  if(!req.file) {
    return next();
  }

  const imgPath = path.join(__dirname, '../images', req.file.filename);
  const outputImg = path.join(__dirname, '../images', `resized_${req.file.filename}`)

  sharp(imgPath)
    .resize(300, 300) // redimensionne l'image 
    .toFile(outputImg, (err, info) => {
      if(err) {
        return next(err);
      }

      // Supprimer l'image originale pour ne garder que l'image redimensionnée
      fs.unlink(imgPath, (unlinkErr) => {
        if (unlinkErr) {
          return next(unlinkErr);
        }

        // Mettre à jour le chemin de l'image pour la version redimensionnée
        req.file.path = outputImg;
        req.file.filename = `resized_${req.file.filename}`;

        next();
      });
    })
}

module.exports = resizeImg;
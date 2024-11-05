const multer = require('multer')
const path  = require('path')

const MIME_TYPES = { // on s'assure que les fichiers sont des images
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images') //dossier où les fichiers seront stockés
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const name = file.originalname.split(' ').join('_')
    callback(null, name + Date.now() + '.' + extension)
  }
});

module.exports = multer({storage: storage}).single('image')

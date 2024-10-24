const multer = require('multer')
const path  = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const name = file.originalname.split(' ').join('_')
    callback(null, name + Date.now() + '.' + extension)
  }
});

module.exports = multer({storage: storage}).single('image')

const multer = require('multer');
const path = require('path');

const diskstorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, path.join(path.join(__dirname, '..', 'uploads', req.route.path.slice(1))))
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + `.${file.mimetype.split('/')[1]}`)
   }
});

const fileUpload = multer({
   storage: diskstorage
});

module.exports = fileUpload.single('file');
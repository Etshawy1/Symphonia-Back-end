const path = require('path');
const multer = require('multer');
const imagePath = path.resolve(__dirname, '..') + '/assets/images/categories';
const appError = require('../utils/appError');
const imagePath1 = 'soso/';
const slugify = require('slugify');
const fileFilter = (req, file, next) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    next(null, true);
  } else {
    next(new appError("error file type is n't allowed", 400), false);
  }
};

// TODO: to do handle the sm and md and lg make them obligatory

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imagePath);
  },
  filename: function(req, file, cb) {
    // look for the extension
    console.log(file);
    let size = file.fieldname.substring(
      file.fieldname.search('_'),
      file.fieldname.length
    );
    let i = file.mimetype.search('/');
    let ext = file.mimetype.substring(i + 1, file.mimetype.length);
    const imName = slugify(req.body.name, { lower: true }) + size + '.' + ext;

    // add the icons
    if (!req.body.icons) {
      req.body.icons = [];
      req.body.icons.push(imName);
    } else {
      req.body.icons.push(imName);
    }

    cb(null, imName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;

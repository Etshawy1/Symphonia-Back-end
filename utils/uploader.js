const path = require('path');
const multer = require('multer');
const imagePath = path.resolve(__dirname, '..') + '/assets/images/categories';
const appError = require('../utils/appError');
const slugify = require('slugify');

// TODO: to do handle the sm and md and lg make them obligatory

// NOTE:
//1. the sequecne of using this classs
/* example

 let uploadBuilder = new UploadBuilder();
  uploadBuilder.addfileField('icon', 'name', '', 1);
  uploadBuilder.addfileField('icon_md', 'name', '_md', 1);
  uploadBuilder.addTypeFilter('image/jpeg');
  uploadBuilder.setPath(
    path.resolve(__dirname, '..') + '/assets/images/categories'
  );
*/

// 2. the file paths will be stored in req.files
//TODO: test this class
class UploadBuilder {
  constructor() {
    this.fileFilter = [];
    this.storage = null;
    this.mimeTypes = [];
    this.filePath = null;
    this.fileFields = [];
    this.uploader = null;
    this.saveByReqName = new Map();
    this.eventEmmiter = null;
  }

  addEventEmmiter(eventEmmiter, action) {}
  setPath(storePath) {
    this.filePath = storePath;
  }

  addfileField(fieldName, saveByReqName, prefix = '', maxCount = 1) {
    this.fileFields.push({
      name: fieldName,
      maxCount: maxCount
    });
    this.saveByReqName.set(fieldName, {
      saveByReqName: saveByReqName,
      maxCount: maxCount,
      prefix: prefix
    });
  }
  /*
   *@param {typeFilter} can be  image/jpeg or image/png
   */
  addTypeFilter(typeFilter) {
    this.fileFilter.push(typeFilter);
  }
  constructUploader() {
    let saveByReqName = this.saveByReqName;
    this.storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, imagePath);
      },
      filename: function(req, file, cb) {
        // look for the extension
        console.log(file);
        let i = file.mimetype.search('/');
        let ext = file.mimetype.substring(i + 1, file.mimetype.length);

        const map = new Map(Object.entries(req.body));
        console.log(map);
        const f_name =
          map.get(saveByReqName.get(file.fieldname).saveByReqName) +
          saveByReqName.get(file.fieldname).prefix;
        const imName = slugify(f_name, { lower: true }) + '.' + ext;
        cb(null, imName);
      }
    });
    let mimeTypes = this.mimeTypes;
    function filter1(req, file, next) {
      // reject a file
      // i have the problem to check for fieldTypes
      let found = false;
      if (mimeTypes.length == 0) found = true; // no types to filter
      for (let index = 0; index < mimeTypes.length; index++) {
        const element = mimeTypes[index];
        if (element == file.mimetype) {
          found = true;
          break;
        }
      }
      if (found) {
        next(null, true);
      } else {
        next(new appError("error file type is n't allowed", 400), false);
      }
    }
    this.uploader = multer({
      storage: this.storage,
      fileFilter: filter1
    });
    return this.uploader.fields(this.fileFields);
  }
  getUploader() {
    return this.uploader.fields(this.fileFields);
  }
}

module.exports.UploadBuilder = UploadBuilder;

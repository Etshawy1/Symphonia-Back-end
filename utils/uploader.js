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
/**
 * class that is used to handle file uploading and saving
 * @example
 * let uploadBuilder = new UploadBuilder();
 * uploadBuilder.addfileField('icon', 'name', '', 1);
 * uploadBuilder.addfileField('icon_md', 'name', '_md', 1);
 * uploadBuilder.addTypeFilter('image/jpeg');
 * uploadBuilder.setPath(
 *   path.resolve(__dirname, '..') + '/assets/images/categories'
 * let f_uploader = uploadBuilder.constructUploader();
 * router.post('/categories', f_uploader, browseController.createCategory);
 * );
 */
class UploadBuilder {
  /**
   * @constructor
   */
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

  /**
   * @summary not working right now
   * @param {String} eventEmmiter
   * @param {String} action
   */
  addEventEmmiter(eventEmmiter, action) {}
  /**
   * @summary - sets the path where the files should be stored
   * @param {String} storePath - the path where the files should be stored
   * @returns {void}
   */
  setPath(storePath) {
    this.filePath = storePath;
  }

  /**
   *
   * @param {string} fieldName the fieldName like icon or so in which the file is stored
   * @param {string} saveByReqName the field in the request whose value is used to name the file
   * @param {string} prefix optional-any prefix you want to add to the filename: it is added before extension
   * @param {number} maxCount the maximum count of fields to expect in usually one if one file is sent and not an array
   */
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
  /**
   * @returns {Map} it returns a map where key:field name in the request and value:{saveByReqName:'name', maxCount:1, prefix:'md}
   */
  getFieldsMap() {
    return this.saveByReqName;
  }
  /**
   *@param {string} typeFilter can be  image/jpeg or image/png ...etc
   */
  addTypeFilter(typeFilter) {
    this.mimeTypes.push(typeFilter);
  }
  /**
   * @returns {Array} - returns the types it is going to filter
   */
  getTypeFilters() {
    return this.mimeTypes;
  }
  /**
   * @returns {function} the ready to use before route middleware
   */
  constructUploader() {
    let saveByReqName = this.saveByReqName;
    this.storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, imagePath);
      },
      filename: function(req, file, cb) {
        // look for the extension
        let i = file.mimetype.search('/');
        let ext = file.mimetype.substring(i + 1, file.mimetype.length);

        const map = new Map(Object.entries(req.body));
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
      console.log(mimeTypes);
      let found = false;
      if (mimeTypes.length == 0) found = true; // no types to filter
      for (let index = 0; index < mimeTypes.length; index++) {
        const element = mimeTypes[index];
        if (element == file.mimetype) {
          found = true;
          break;
        }
      }
      console.log(found);
      if (found) {
        next(null, true);
      } else {
        return next(new appError("error file type is n't allowed", 400), false);
      }
    }
    this.uploader = multer({
      storage: this.storage,
      fileFilter: filter1
    });
    return this.uploader.fields(this.fileFields);
  }
  /**
   * @returns {function} the ready to use before route middleware
   */
  getUploader() {
    return this.uploader.fields(this.fileFields);
  }
}

module.exports.UploadBuilder = UploadBuilder;

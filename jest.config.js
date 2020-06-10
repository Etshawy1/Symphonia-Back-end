module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: [
    '**/models/**',
    '**/routes/**',
    '**/utils/**',
    '**/controllers/**',
    '**/startup/**',
    '!**/startup/db.js',
    '!**/controllers/indexController.js',
    '!**/controllers/errorController.js',
    '!**/startup/passport-setup.js',
    '!**/utils/apiFeatures.js'
  ]
};

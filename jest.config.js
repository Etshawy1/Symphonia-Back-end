module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: [
    '**/controllers/**',
    '**/startup/**',
    '!**/startup/db.js',
    '!**/controllers/indexController.js',
    '!**/controllers/errorController.js',
    '!**/startup/passport-setup.js',
    '**/models/**',
    '**/routes/**',
    '**/utils/**'
  ]
};

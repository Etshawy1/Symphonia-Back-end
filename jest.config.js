module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: [
    '**/controllers/**',
    '**/startup/**',
    '!**/startup/db.js',
    '!**/controllers/indexController.js',
    '!**/startup/passport-setup.js',
    '**/models/**',
    '**/routes/**',
    '**/utils/**'
  ]
};

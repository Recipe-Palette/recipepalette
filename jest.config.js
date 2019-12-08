const path = require('path')

module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/tests/jest-preprocess.js`,
  },
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    path.join(__dirname, 'tests'),
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/tests/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/tests/loadershim.js`],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], //add jest-dom extensions to all of our jest tests
  collectCoverageFrom: ['**/src/**/*.js'],
}

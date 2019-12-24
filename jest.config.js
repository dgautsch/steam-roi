module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.{js,vue}', 'server/**/*.js'],
  testEnvironment: 'jsdom',
  verbose: true,
  moduleNameMapper: {
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@components/(.*)$': '<rootDir>/app/components/$1'
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js?$': 'babel-jest'
  }
}

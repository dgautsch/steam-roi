module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  disableDatabase: process.env.DISABLE_DB === true
}

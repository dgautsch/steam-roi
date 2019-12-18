module.exports = function (req, res, next) {
  let err = new Error('Not Found 404')
  res.status(err.status || 404)
  res.render('index', { error: err })
}

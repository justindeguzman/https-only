
/*
 * HTTPS Only.
 */

function httpsOnly () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      var err = new Error('HTTPS required.')
      err.status = 400
      next(err)
    } else {
      next()
    }
  }
}

/*
 * Module exports.
 */

module.exports = httpsOnly

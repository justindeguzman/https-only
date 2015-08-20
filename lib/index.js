
/*
 * HTTPS Only.
 */

/*
 * ExpressJS middleware to force applications to accept HTTPS requests only.
 * @param allowDebug - Allow applications to use HTTP when NODE_ENV is set to
 *                     `development`.
 * @api public
 */

function httpsOnly (allowDebug) {
  if (process.env.NODE_ENV === 'development' && allowDebug) {
    return function (req, res, next) {
      next()
    }
  } else {
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
}

/*
 * Module exports.
 */

module.exports = httpsOnly

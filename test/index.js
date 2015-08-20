
/* global describe it */

/*
 * Module dependencies.
 */

var express = require('express')
var request = require('request')
var should = require('should')

var httpsOnly = require('../lib')

describe('https-only', function () {

  var port = 9999

  /*
   * Setup test server.
   */

  function setupTestServer (allowDebug) {
    var app = express()

    // Enable https-only
    app.use(httpsOnly(allowDebug))

    app.use('/', function (req, res) {
      res.status = 200
      res.send('success')
    })

    app.use(function (err, req, res, next) {
      res.status(err.status)
      res.send({message: err.message})
    })

    return app.listen(port)
  }

  /*
   * Tests.
   */

  it('should be an invalid request', function (done) {
    var server = setupTestServer()

    request('http://localhost:' + port + '/', function (err, response, body) {
      should.not.exist(err)
      should.exist(response)
      should.exist(response.statusCode)
      response.statusCode.should.eql(400)
      server.close()
      done()
    })
  })

  it('should be a valid HTTP request when NODE_ENV=development and ' +
     'allowDebug=true',
    function (done) {
      process.env.NODE_ENV = 'development'
      var allowDebug = true
      var server = setupTestServer(allowDebug)

      request('http://localhost:' + port + '/', function (err, response, body) {
        should.not.exist(err)
        should.exist(response)
        should.exist(response.statusCode)
        response.statusCode.should.eql(200)
        server.close()
        done()
      })
    }
  )

  it('should be an invalid HTTP request when NODE_ENV=development and ' +
     'allowDebug=false',
    function (done) {
      process.env.NODE_ENV = 'development'
      var allowDebug = false
      var server = setupTestServer(allowDebug)

      request('http://localhost:' + port + '/', function (err, response, body) {
        should.not.exist(err)
        should.exist(response)
        should.exist(response.statusCode)
        response.statusCode.should.eql(400)
        server.close()
        done()
      })
    }
  )
})

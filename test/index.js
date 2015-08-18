
/* global describe it */

/*
 * Module dependencies.
 */

var express = require('express')
var request = require('request')
var should = require('should')

var httpsOnly = require('../lib')

describe('https-only', function () {

  /*
   * Setup test server.
   */

  var app
  var port = 9999

  before(function () {
    app = express()

    // Enable https-only
    app.use(httpsOnly())

    app.use('/', function(req, res) {
      res.status = 200
      res.send('success')
    })

    app.use(function(err, req, res, next) {
      res.status(err.status)
      res.send({message: err.message})
    })

    app.listen(port)
  })

  /*
   * Tests.
   */

  it('should be an invalid request', function (done) {
    request('http://localhost:' + port + '/', function(err, response, body) {
      should.not.exist(err)
      should.exist(response)
      should.exist(response.statusCode)
      response.statusCode.should.eql(400)
      done()
    })
  })
})

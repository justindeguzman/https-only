# https-only
ExpressJS middleware to force applications to accept HTTPS requests only.

## Installation

    $ npm install https-only
  
## Usage

```js
var httpsOnly = require('https-only')
var express = require('express')
var app = express()

// Enable https-only
app.use(httpsOnly())

// Any routes beneath the https-only middleware will need to be
// accessed via HTTPS
app.use('/', function(req, res) {
  res.send('hello world')
})

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status)
  res.send({message: err.message})
})

app.listen(3000)
```

## Running Tests

    $ mocha
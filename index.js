'use strict'

const promiseFlat = require('./src/promise-flat')
const promiseSleep = require('./src/promise-sleep')
const { promiseTimeout, PromiseTimeoutError } = require('./src/promise-timeout')

module.exports = {
  promiseFlat,
  promiseSleep,
  promiseTimeout,
  PromiseTimeoutError
}

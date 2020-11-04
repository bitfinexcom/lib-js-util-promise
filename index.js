'use strict'

const promiseSleep = require('./src/promise-sleep')
const { promiseTimeout, PromiseTimeoutError } = require('./src/promise-timeout')

module.exports = {
  promiseSleep,
  promiseTimeout,
  PromiseTimeoutError
}

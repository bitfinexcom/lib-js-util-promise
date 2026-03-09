'use strict'

const promiseFlat = require('./src/promise-flat')
const promiseSleep = require('./src/promise-sleep')
const { promiseTimeout, PromiseTimeoutError } = require('./src/promise-timeout')
const promiseMap = require('./src/promise-map')
const resolvePromiseCb = require('./src/resolve-promise-cb')
const waitForCondition = require('./src/wait-for-condition')

module.exports = {
  promiseFlat,
  promiseSleep,
  promiseMap,
  promiseTimeout,
  PromiseTimeoutError,
  resolvePromiseCb,
  waitForCondition
}

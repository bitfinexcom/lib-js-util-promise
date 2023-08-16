'use strict'

const promiseFlat = require('./src/promise-flat')
const promiseSleep = require('./src/promise-sleep')
const { promiseTimeout, PromiseTimeoutError } = require('./src/promise-timeout')
const TaskPriorityQueue = require('./src/task-priority-queue')
const TaskQueue = require('./src/task-queue')

module.exports = {
  promiseFlat,
  promiseSleep,
  promiseTimeout,
  PromiseTimeoutError,
  TaskPriorityQueue,
  TaskQueue
}

'use strict'

const async = require('async')
const promiseFlat = require('./promise-flat')

class TaskPriorityQueue {
  constructor (concurrency = 1) {
    this.queue = async.priorityQueue(async (job, cb) => {
      try {
        const res = await job.task()
        job.resolve(res)
      } catch (err) {
        job.reject(err)
      } finally {
        cb() // task queue cb
      }
    }, concurrency)
  }

  /**
   * @param {() => Promise<any>} task
   * @param {number} priority
   */
  pushTask (task, priority) {
    const { promise, resolve, reject } = promiseFlat()
    const job = { task, resolve, reject }
    this.queue.push(job, priority)

    return promise
  }
}

module.exports = TaskPriorityQueue

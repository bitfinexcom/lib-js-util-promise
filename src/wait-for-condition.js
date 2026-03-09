'use strict'

const { promiseTimeout } = require('./promise-timeout')

/**
 * Wait for sometime until an action resolves to a truthy result
 *
 * @param {function(): Promise<any>|any} action
 * @param {object} [opts]
 * @param {number} [opts.timeoutMs] - max time to wait condition to happen
 * @param {number} [opts.intervalMs] - time between checks
 *
 * @returns Promise<any> - action result
 * @throws {PromiseTimeoutError}
 */
const waitForCondition = async (action, opts = {}) => {
  const timeoutMs = opts.timeoutMs || 5000
  const intervalMs = opts.intervalMs || 100

  let interval
  const repeatingConditionCheck = () => new Promise((resolve) => {
    interval = setInterval(async () => {
      const res = await action()
      if (res) {
        resolve(res)
      }
    }, intervalMs)
  })

  return promiseTimeout(repeatingConditionCheck, timeoutMs, `condition did not happen after ${timeoutMs}ms`).finally(() => clearInterval(interval))
}

module.exports = waitForCondition

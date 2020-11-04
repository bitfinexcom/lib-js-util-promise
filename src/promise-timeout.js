'use strict'

class PromiseTimeoutError extends Error {
  constructor (message = null) {
    super(message)

    if (!message) {
      this.message = 'ERR_PROMISE_TIMEOUT'
    }

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Run a promise with an execution timeout
 *
 * @param {Promise<any>|Function} promise Promise that timeout will be checked against
 * @param {number} ms Time in milliseconds until promise is timed out
 * @param {string} [errMsg] Custom error message for PromiseTimeoutError
 *
 * @returns {Promise<any>}
 * @throws {PromiseTimeoutError}
 */
const promiseTimeout = async (promise, ms, errMsg = null) => {
  const _promise = typeof promise === 'function' ? promise() : promise
  const timeoutErr = new PromiseTimeoutError(errMsg)
  let timeout = null

  try {
    const res = await Promise.race([
      _promise,
      new Promise((resolve, reject) => {
        timeout = setTimeout(() => { reject(timeoutErr) }, ms)
      })
    ])

    return res
  } catch (err) {
    if (err !== timeoutErr) clearTimeout(timeout) // not timeout error
    throw err
  }
}

module.exports = {
  promiseTimeout,
  PromiseTimeoutError
}

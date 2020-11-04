'use strict'

/**
 * Wait until specific time before resolving the promise
 *
 * @param {number} ms Time in milliseconds until promise is resolved
 * @param {any} [retVal] Optional return value that is resolved
 *
 * @returns {Promise<any>}
 */
const promiseSleep = (ms, retVal = null) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve(retVal) }, ms)
  })
}

module.exports = promiseSleep

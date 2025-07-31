'use strict'

/**
 * Apply function to iterable and execute returned promises concurrently with optional limit.
 * Interrupts execution if any of promises rejected similar to Promise.all
 *
 * @param {any[]} elements - array of elements. Each element will be passed as an argument to the function
 * @param {function} fn - a function to apply to each element
 * @param {number} concurrency - limit of promises to be executed in parallel. Default is 0 - no limit
 * @returns {Promise[]}
 */
const promiseMap = async (elements, fn, { concurrency = 0 } = {}) => {
  if (!Array.isArray(elements)) {
    throw new Error('elements param must be an array')
  }
  if (typeof fn !== 'function') {
    throw new Error('fn param must be a function')
  }
  if (!elements.length) {
    return
  }

  if (concurrency === 0) {
    return Promise.all(elements.map(el => fn(el)))
  }
  // Enhance arguments array to have an index of the argument at hand
  const results = new Array(elements.length)
  const elCnt = elements.length
  let active = 0
  let i = 0
  return new Promise((resolve, reject) => {
    let executionError = null
    let errorThrown = false

    function chainPromises () {
      if (executionError) {
        if (!errorThrown) {
          errorThrown = true
          return reject(executionError)
        }
        return null
      }

      if (i === elCnt && active === 0) {
        return resolve(results)
      }

      while (i < elCnt && active < concurrency) {
        const elIx = i++
        const arg = elements[elIx]
        active++
        fn(arg)
          .then(r => {
            results[elIx] = r
            active--
            chainPromises()
          })
          .catch(e => {
            executionError = e
          })
      }
    }

    chainPromises()
  })
}

module.exports = promiseMap

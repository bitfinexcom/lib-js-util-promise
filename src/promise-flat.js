'use strict'

/**
 * Returns promise and separated resolve, reject methods
 *
 * @returns { promise: Promise<any>, resolve: (val: any) => void, reject: (err: Error) => void }
 */
const promiseFlat = () => {
  let resolve, reject
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  return { promise, resolve, reject }
}

module.exports = promiseFlat

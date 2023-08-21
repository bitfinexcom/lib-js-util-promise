/**
 * Calls the callback or resolves the Promise if no cb
 *
 * @param {Error} The error, if any
 * @param {any} The resolved value, if any
 * @param {function} The callback function, if not a promise
 *
 * @returns { promise: Promise<any>, resolve: (val: any) => void, reject: (err: Error) => void }
 */
const resolvePromiseCb = (err, res, cb) => {
  const isCb = typeof cb === 'function'
  if (!err) return isCb ? cb(null, res) : Promise.resolve(res)
  if (isCb) return cb(err)
  return Promise.reject(err)
}

module.exports = resolvePromiseCb

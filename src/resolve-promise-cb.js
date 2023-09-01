/**
 * Calls the callback or resolves the Promise if no cb
 *
 * @param {Error} err - The error, if any
 * @param {any} res - The resolved value, if any
 * @param {(err?: Error, res?: any) => void} cb - The callback function, if not a promise
 *
 * @returns {void|Promise<any>}
 */
const resolvePromiseCb = (err, res, cb) => {
  const isCb = typeof cb === 'function'
  if (!err) return isCb ? cb(null, res) : Promise.resolve(res)
  if (isCb) return cb(err)
  return Promise.reject(err)
}

module.exports = resolvePromiseCb

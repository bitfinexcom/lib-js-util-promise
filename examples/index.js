'use strict'

const { promiseSleep, promiseTimeout } = require('../')

const someSlowFunc = async () => {
  await promiseSleep(5000) // wait 5s
  return ['user 1', 'user 2']
}

const main = async () => {
  try {
    await promiseTimeout(someSlowFunc(), 3000) // wait max 3s
  } catch (err) {
    console.error(err) // should reach here
  }
}

main()

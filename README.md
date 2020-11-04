# lib-js-util-promise

The lib includes the utilities depicted below:
- promiseSleep - promise version of setTimeout
- promiseTimeout - wraps the promise/async function with a timeout so it doesn't run forever

## Installing

```console
npm install --save https://github.com/bitfinexcom/lib-js-util-promise.git
```

## Testing

```console
npm run test
```

## Usage

```javascript
const { promiseSleep, promiseTimeout } = require('@bitfinex/lib-js-util-promise')

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

```

More examples can be found under examples directory!

## Authors
- vigan.abd
